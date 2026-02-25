# 🔧 Hunger Heroes — Backend Flask API for Barcode Donation System

> **Purpose**: This document provides a complete prompt/specification for implementing the Flask backend that complements the frontend barcode donation label system. The frontend is fully functional with offline/localStorage fallback — this backend adds persistence, multi-user support, and advanced features.

---

## 📐 Architecture Overview

```
Frontend (Jekyll + Tailwind)          Backend (Flask + SQLite/PostgreSQL)
┌─────────────────────────┐          ┌──────────────────────────────────┐
│  /donate/create          │──POST──▶│  POST /api/donation               │
│  (multi-step form)       │         │  → creates donation, returns id   │
│                          │         │                                    │
│  /donate/barcode         │──GET───▶│  GET  /api/donation/<id>          │
│  (barcode label gen)     │         │  → returns donation JSON           │
│                          │         │                                    │
│  /donate/scan            │──GET───▶│  GET  /api/donation/<id>          │
│  (barcode/QR scanner)    │──POST──▶│  POST /api/donation/<id>/accept   │
│                          │──POST──▶│  POST /api/donation/<id>/deliver  │
│                          │         │  → marks as delivered, auto-remove │
│                          │         │                                    │
│  /donate/history         │──GET───▶│  GET  /api/donation               │
│  (my donations list)     │         │  → returns user's donations        │
│                          │         │                                    │
│  /donate/ (hub)          │──GET───▶│  GET  /api/donation/stats          │
│  (stats dashboard)       │         │  → returns aggregate stats         │
│                          │         │                                    │
│                          │         │  🔄 CRON / Scheduler               │
│                          │         │  → auto-delete delivered >24hrs    │
└─────────────────────────┘          └──────────────────────────────────┘
```

---

## 📦 Data Model

### Donation Table

```python
class Donation(db.Model):
    """
    Represents a food donation with barcode label data.
    """
    __tablename__ = 'donations'

    id = db.Column(db.String(50), primary_key=True)  # e.g. "HH-M3X7K9-AB2F"
    
    # Food details
    food_name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)   # canned, fresh-produce, dairy, etc.
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(30), nullable=False)        # items, lbs, kg, cans, boxes, etc.
    description = db.Column(db.Text, nullable=True)
    
    # Safety & handling
    expiry_date = db.Column(db.Date, nullable=False)
    storage = db.Column(db.String(30), nullable=False)     # room-temp, refrigerated, frozen, cool-dry
    allergens = db.Column(db.JSON, nullable=True)           # ["gluten", "dairy", "nuts", ...]
    dietary_tags = db.Column(db.JSON, nullable=True)        # ["vegetarian", "vegan", "halal", ...]
    
    # Donor info
    donor_name = db.Column(db.String(200), nullable=False)
    donor_email = db.Column(db.String(200), nullable=False)
    donor_phone = db.Column(db.String(30), nullable=True)
    donor_zip = db.Column(db.String(10), nullable=False)
    special_instructions = db.Column(db.Text, nullable=True)
    
    # Tracking
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # linked to auth user
    status = db.Column(db.String(20), default='active')    # active, accepted, delivered, expired, cancelled
    accepted_by = db.Column(db.String(200), nullable=True) # name/org of who accepted
    accepted_at = db.Column(db.DateTime, nullable=True)
    delivered_by = db.Column(db.String(200), nullable=True) # name/org of who marked delivered
    delivered_at = db.Column(db.DateTime, nullable=True)     # when it was delivered — auto-delete 24hrs after this
    scan_count = db.Column(db.Integer, default=0)          # how many times the barcode/QR was scanned
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

---

## 🔌 API Endpoints

### 1. `POST /api/donation` — Create a new donation

**Auth**: Optional (links to user if logged in)

**Request Body**:
```json
{
    "food_name": "Canned Tomato Soup",
    "category": "canned",
    "quantity": 10,
    "unit": "cans",
    "description": "Campbell's, unopened",
    "expiry_date": "2026-06-15",
    "storage": "room-temp",
    "allergens": ["gluten"],
    "dietary_tags": ["vegetarian"],
    "donor_name": "John Doe",
    "donor_email": "john@example.com",
    "donor_phone": "(619) 555-0123",
    "donor_zip": "92101",
    "special_instructions": "Pick up before 5pm"
}
```

**Response** (`201 Created`):
```json
{
    "id": "HH-M3X7K9-AB2F",
    "message": "Donation created successfully",
    "donation": { ... }
}
```

**Implementation Notes**:
- Generate a unique ID in format: `HH-<timestamp_base36>-<random_4chars>` 
- Link to authenticated user if session exists
- Validate: `food_name`, `category`, `quantity`, `unit`, `expiry_date`, `storage`, `donor_name`, `donor_email`, `donor_zip` are required
- `expiry_date` must be today or in the future
- `allergens` and `dietary_tags` must be from allowed enums

```python
import string, time, random

def generate_donation_id():
    timestamp = int(time.time() * 1000)
    base36 = ''
    while timestamp:
        timestamp, remainder = divmod(timestamp, 36)
        base36 = (string.digits + string.ascii_uppercase)[remainder] + base36
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"HH-{base36[-6:]}-{suffix}"
```

---

### 2. `GET /api/donation/<id>` — Get donation by ID

**Auth**: Public (anyone with the ID/QR code can see it)

**Response** (`200 OK`):
```json
{
    "id": "HH-M3X7K9-AB2F",
    "food_name": "Canned Tomato Soup",
    "category": "canned",
    "quantity": 10,
    "unit": "cans",
    "description": "Campbell's, unopened",
    "expiry_date": "2026-06-15",
    "storage": "room-temp",
    "allergens": ["gluten"],
    "dietary_tags": ["vegetarian"],
    "donor_name": "John Doe",
    "donor_email": "john@example.com",
    "donor_phone": "(619) 555-0123",
    "donor_zip": "92101",
    "special_instructions": "Pick up before 5pm",
    "status": "active",
    "scan_count": 3,
    "created_at": "2026-02-24T10:30:00Z"
}
```

**Implementation Notes**:
- Increment `scan_count` each time this endpoint is called (to track engagement)
- Return `404` if not found

---

### 3. `GET /api/donation` — List user's donations

**Auth**: Required (returns only donations linked to the authenticated user)

**Query Params**:
- `status` (optional): `active`, `accepted`, `expired`, `all` (default: `all`)
- `page` (optional): page number (default: `1`)
- `per_page` (optional): items per page (default: `20`)

**Response** (`200 OK`):
```json
[
    {
        "id": "HH-M3X7K9-AB2F",
        "food_name": "Canned Tomato Soup",
        "category": "canned",
        "quantity": 10,
        "unit": "cans",
        "expiry_date": "2026-06-15",
        "status": "active",
        "created_at": "2026-02-24T10:30:00Z"
    },
    ...
]
```

**Implementation Notes**:
- Filter by `user_id` from session
- Auto-update status to `expired` if `expiry_date < today`
- Sort by `created_at` descending (newest first)

---

### 4. `POST /api/donation/<id>/accept` — Accept a donation

**Auth**: Optional (records who accepted)

**Request Body** (optional):
```json
{
    "accepted_by": "San Diego Food Bank"
}
```

**Response** (`200 OK`):
```json
{
    "message": "Donation accepted",
    "donation_id": "HH-M3X7K9-AB2F",
    "status": "accepted"
}
```

**Implementation Notes**:
- Set `status = 'accepted'`, `accepted_at = now()`, `accepted_by = name`
- If authenticated, auto-fill `accepted_by` from user profile
- Cannot accept already-accepted or expired donations
- Return `409 Conflict` if already accepted

---

### 5. `POST /api/donation/<id>/deliver` — Mark donation as delivered

**Auth**: Optional (records who delivered)

**Request Body** (optional):
```json
{
    "delivered_by": "Volunteer Team Alpha"
}
```

**Response** (`200 OK`):
```json
{
    "message": "Donation marked as delivered — will be auto-removed in 24 hours",
    "donation_id": "HH-M3X7K9-AB2F",
    "status": "delivered",
    "delivered_at": "2026-02-25T14:30:00Z",
    "auto_remove_at": "2026-02-26T14:30:00Z"
}
```

**Implementation Notes**:
- Set `status = 'delivered'`, `delivered_at = now()`, `delivered_by = name`
- If authenticated, auto-fill `delivered_by` from user profile
- Cannot deliver already-delivered or expired donations
- Return `409 Conflict` if already delivered
- **After 24 hours**, the background scheduler will auto-delete this record from the database

---

### 6. `GET /api/donation/stats` — Get aggregate donation stats

**Auth**: Optional (if authenticated, returns personal stats; otherwise global)

**Response** (`200 OK`):
```json
{
    "total": 156,
    "active": 42,
    "accepted": 98,
    "delivered": 45,
    "expired": 16,
    "scanned": 234
}
```

---

## 🔑 Allowed Enum Values

### Categories
```python
ALLOWED_CATEGORIES = [
    'canned', 'fresh-produce', 'dairy', 'bakery', 'meat-protein',
    'grains', 'beverages', 'frozen', 'snacks', 'baby-food',
    'prepared-meals', 'other'
]
```

### Units
```python
ALLOWED_UNITS = [
    'items', 'lbs', 'kg', 'oz', 'cans', 'boxes', 'bags', 'trays', 'servings'
]
```

### Storage Types
```python
ALLOWED_STORAGE = ['room-temp', 'refrigerated', 'frozen', 'cool-dry']
```

### Allergens
```python
ALLOWED_ALLERGENS = [
    'gluten', 'dairy', 'nuts', 'soy', 'eggs', 'shellfish', 'fish', 'none'
]
```

### Dietary Tags
```python
ALLOWED_DIETARY = [
    'vegetarian', 'vegan', 'halal', 'kosher', 'gluten-free', 'organic'
]
```

### Statuses
```python
ALLOWED_STATUSES = ['active', 'accepted', 'delivered', 'expired', 'cancelled']
```

---

## 🧩 Flask Blueprint Implementation

```python
# api/donation.py

from flask import Blueprint, request, jsonify, g
from flask_restful import Api, Resource
from datetime import datetime, date, timedelta
from model.donation import Donation
from __init__ import db
import string, time, random

donation_api = Blueprint('donation_api', __name__, url_prefix='/api')
api = Api(donation_api)

def generate_donation_id():
    """Generate a unique human-readable donation ID."""
    timestamp = int(time.time() * 1000)
    base36 = ''
    while timestamp:
        timestamp, remainder = divmod(timestamp, 36)
        base36 = (string.digits + string.ascii_uppercase)[remainder] + base36
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"HH-{base36[-6:]}-{suffix}"


class DonationListAPI(Resource):
    """
    POST /api/donation      → Create a new donation
    GET  /api/donation       → List current user's donations
    """
    
    def post(self):
        data = request.get_json()
        
        # Validation
        required = ['food_name', 'category', 'quantity', 'unit', 
                     'expiry_date', 'storage', 'donor_name', 'donor_email', 'donor_zip']
        for field in required:
            if not data.get(field):
                return {'message': f'Missing required field: {field}'}, 400

        # Validate enums
        if data['category'] not in ALLOWED_CATEGORIES:
            return {'message': f'Invalid category: {data["category"]}'}, 400
        if data['unit'] not in ALLOWED_UNITS:
            return {'message': f'Invalid unit: {data["unit"]}'}, 400
        if data['storage'] not in ALLOWED_STORAGE:
            return {'message': f'Invalid storage type: {data["storage"]}'}, 400

        # Validate expiry date
        try:
            expiry = datetime.strptime(data['expiry_date'], '%Y-%m-%d').date()
            if expiry < date.today():
                return {'message': 'Expiry date cannot be in the past'}, 400
        except ValueError:
            return {'message': 'Invalid date format. Use YYYY-MM-DD'}, 400

        # Create donation
        donation_id = generate_donation_id()
        donation = Donation(
            id=donation_id,
            food_name=data['food_name'],
            category=data['category'],
            quantity=int(data['quantity']),
            unit=data['unit'],
            description=data.get('description', ''),
            expiry_date=expiry,
            storage=data['storage'],
            allergens=data.get('allergens', []),
            dietary_tags=data.get('dietary_tags', []),
            donor_name=data['donor_name'],
            donor_email=data['donor_email'],
            donor_phone=data.get('donor_phone', ''),
            donor_zip=data['donor_zip'],
            special_instructions=data.get('special_instructions', ''),
            user_id=g.current_user.id if hasattr(g, 'current_user') and g.current_user else None,
            status='active'
        )
        
        db.session.add(donation)
        db.session.commit()
        
        return {
            'id': donation_id,
            'donation_id': donation_id,
            'message': 'Donation created successfully'
        }, 201

    def get(self):
        """List donations for the current user."""
        if not hasattr(g, 'current_user') or not g.current_user:
            return {'message': 'Authentication required'}, 401
        
        status_filter = request.args.get('status', 'all')
        query = Donation.query.filter_by(user_id=g.current_user.id)
        
        if status_filter != 'all':
            query = query.filter_by(status=status_filter)
        
        # Auto-expire old donations
        today = date.today()
        expired = Donation.query.filter(
            Donation.user_id == g.current_user.id,
            Donation.expiry_date < today,
            Donation.status == 'active'
        ).all()
        for d in expired:
            d.status = 'expired'
        if expired:
            db.session.commit()
        
        donations = query.order_by(Donation.created_at.desc()).all()
        return [d.to_dict() for d in donations], 200


class DonationDetailAPI(Resource):
    """
    GET /api/donation/<id>   → Get a single donation by ID
    """
    
    def get(self, donation_id):
        donation = Donation.query.get(donation_id)
        if not donation:
            return {'message': 'Donation not found'}, 404
        
        # Increment scan count
        donation.scan_count = (donation.scan_count or 0) + 1
        db.session.commit()
        
        return donation.to_dict(), 200


class DonationAcceptAPI(Resource):
    """
    POST /api/donation/<id>/accept   → Accept a donation
    """
    
    def post(self, donation_id):
        donation = Donation.query.get(donation_id)
        if not donation:
            return {'message': 'Donation not found'}, 404
        
        if donation.status == 'accepted':
            return {'message': 'Donation already accepted'}, 409
        if donation.status == 'delivered':
            return {'message': 'Donation already delivered'}, 409
        if donation.status == 'expired':
            return {'message': 'Cannot accept an expired donation'}, 400
        
        data = request.get_json() or {}
        accepted_by = data.get('accepted_by', '')
        
        if hasattr(g, 'current_user') and g.current_user and not accepted_by:
            accepted_by = g.current_user.name
        
        donation.status = 'accepted'
        donation.accepted_by = accepted_by
        donation.accepted_at = datetime.utcnow()
        db.session.commit()
        
        return {
            'message': 'Donation accepted',
            'donation_id': donation_id,
            'status': 'accepted'
        }, 200


class DonationDeliverAPI(Resource):
    """
    POST /api/donation/<id>/deliver   → Mark donation as delivered
    
    Once marked as delivered, a background job (or the cleanup endpoint)
    will auto-delete the donation record after 24 hours.
    """
    
    def post(self, donation_id):
        donation = Donation.query.get(donation_id)
        if not donation:
            return {'message': 'Donation not found'}, 404
        
        if donation.status == 'delivered':
            return {'message': 'Donation already delivered'}, 409
        if donation.status == 'expired':
            return {'message': 'Cannot deliver an expired donation'}, 400
        
        data = request.get_json() or {}
        delivered_by = data.get('delivered_by', '')
        
        if hasattr(g, 'current_user') and g.current_user and not delivered_by:
            delivered_by = g.current_user.name
        
        donation.status = 'delivered'
        donation.delivered_by = delivered_by
        donation.delivered_at = datetime.utcnow()
        db.session.commit()
        
        return {
            'message': 'Donation marked as delivered — will be auto-removed in 24 hours',
            'donation_id': donation_id,
            'status': 'delivered',
            'delivered_at': donation.delivered_at.isoformat(),
            'auto_remove_at': (donation.delivered_at + timedelta(hours=24)).isoformat()
        }, 200


class DonationStatsAPI(Resource):
    """
    GET /api/donation/stats   → Get aggregate stats
    """
    
    def get(self):
        if hasattr(g, 'current_user') and g.current_user:
            base = Donation.query.filter_by(user_id=g.current_user.id)
        else:
            base = Donation.query
        
        total = base.count()
        active = base.filter_by(status='active').count()
        accepted = base.filter_by(status='accepted').count()
        delivered = base.filter_by(status='delivered').count()
        expired = base.filter_by(status='expired').count()
        scanned = db.session.query(db.func.sum(Donation.scan_count)).scalar() or 0
        
        return {
            'total': total,
            'active': active,
            'accepted': accepted,
            'delivered': delivered,
            'expired': expired,
            'scanned': int(scanned)
        }, 200


# Register routes
api.add_resource(DonationListAPI, '/donation')
api.add_resource(DonationStatsAPI, '/donation/stats')
api.add_resource(DonationDetailAPI, '/donation/<string:donation_id>')
api.add_resource(DonationAcceptAPI, '/donation/<string:donation_id>/accept')
api.add_resource(DonationDeliverAPI, '/donation/<string:donation_id>/deliver')
```

---

## 🗃️ Model `to_dict()` Method

```python
def to_dict(self):
    return {
        'id': self.id,
        'food_name': self.food_name,
        'category': self.category,
        'quantity': self.quantity,
        'unit': self.unit,
        'description': self.description,
        'expiry_date': self.expiry_date.isoformat() if self.expiry_date else None,
        'storage': self.storage,
        'allergens': self.allergens or [],
        'dietary_tags': self.dietary_tags or [],
        'donor_name': self.donor_name,
        'donor_email': self.donor_email,
        'donor_phone': self.donor_phone,
        'donor_zip': self.donor_zip,
        'special_instructions': self.special_instructions,
        'status': self.status,
        'scan_count': self.scan_count or 0,
        'accepted_by': self.accepted_by,
        'accepted_at': self.accepted_at.isoformat() if self.accepted_at else None,
        'delivered_by': self.delivered_by,
        'delivered_at': self.delivered_at.isoformat() if self.delivered_at else None,
        'created_at': self.created_at.isoformat() if self.created_at else None,
        'updated_at': self.updated_at.isoformat() if self.updated_at else None,
    }
```

---

## 🧪 Test Data Seeder

```python
def seed_donations():
    """Seed sample donations for development."""
    from datetime import timedelta
    
    samples = [
        {
            'food_name': 'Canned Tomato Soup',
            'category': 'canned',
            'quantity': 24,
            'unit': 'cans',
            'description': "Campbell's condensed, unopened",
            'expiry_date': date.today() + timedelta(days=180),
            'storage': 'room-temp',
            'allergens': ['gluten'],
            'dietary_tags': ['vegetarian'],
            'donor_name': 'Local Grocery Co.',
            'donor_email': 'donate@localgrocery.com',
            'donor_zip': '92101',
        },
        {
            'food_name': 'Fresh Bread Loaves',
            'category': 'bakery',
            'quantity': 15,
            'unit': 'items',
            'description': 'Whole wheat, baked today',
            'expiry_date': date.today() + timedelta(days=3),
            'storage': 'room-temp',
            'allergens': ['gluten'],
            'dietary_tags': ['vegan'],
            'donor_name': 'Sunrise Bakery',
            'donor_email': 'info@sunrisebakery.com',
            'donor_zip': '92102',
        },
        {
            'food_name': 'Mixed Frozen Vegetables',
            'category': 'frozen',
            'quantity': 30,
            'unit': 'bags',
            'description': 'Peas, carrots, corn, green beans',
            'expiry_date': date.today() + timedelta(days=365),
            'storage': 'frozen',
            'allergens': ['none'],
            'dietary_tags': ['vegan', 'gluten-free'],
            'donor_name': 'SD Community Farm',
            'donor_email': 'farm@sdcommunity.org',
            'donor_zip': '92103',
        }
    ]
    
    for s in samples:
        donation = Donation(
            id=generate_donation_id(),
            status='active',
            **s
        )
        db.session.add(donation)
    
    db.session.commit()
    print("✅ Seeded sample donations")
```

---

## 🔐 CORS Configuration

Make sure your Flask CORS config allows the frontend origin:

```python
from flask_cors import CORS

CORS(app, supports_credentials=True, origins=[
    "http://localhost:4100",
    "http://127.0.0.1:4100",
    "https://ahaanv19.github.io"
])
```

---

## 📋 Registration in Main App

```python
# In your main app __init__.py or app.py, register the blueprint:

from api.donation import donation_api
app.register_blueprint(donation_api)
```

---

## ✅ Checklist for Backend Implementation

- [ ] Create `model/donation.py` with the `Donation` model (including `delivered_by`, `delivered_at`)
- [ ] Create `api/donation.py` with all 6 endpoints
- [ ] Register blueprint in main `app.py`
- [ ] Run `db.create_all()` or migration to create the `donations` table
- [ ] Set up the auto-cleanup scheduler (see below)
- [ ] Seed test data with `seed_donations()`
- [ ] Ensure CORS allows frontend origin
- [ ] Test all endpoints with Postman/curl:
  - `POST /api/donation` (create)
  - `GET /api/donation/HH-XXXXXX-XXXX` (lookup by ID)
  - `GET /api/donation` (list for user, requires auth)
  - `POST /api/donation/HH-XXXXXX-XXXX/accept` (accept)
  - `POST /api/donation/HH-XXXXXX-XXXX/deliver` (mark delivered)
  - `GET /api/donation/stats` (stats)
- [ ] Verify barcode scan flow end-to-end (create → print → scan → view → deliver)

---

## 🌐 Frontend ↔ Backend Integration Notes

| Frontend Location | API Call | Fallback |
|---|---|---|
| `create.md` → `submitDonation()` | `POST /api/donation` | Client-side ID + localStorage |
| `barcode.md` → on load | `GET /api/donation/<id>` | sessionStorage → localStorage |
| `scan.md` → `lookupDonation()` | `GET /api/donation/<id>` | localStorage |
| `scan.md` → `acceptDonation()` | `POST /api/donation/<id>/accept` | localStorage status update |
| `scan.md` → `markAsDelivered()` | `POST /api/donation/<id>/deliver` | localStorage status + delivered_at |
| `history.md` → on load | `GET /api/donation` | localStorage |
| `index.md` → on load | `GET /api/donation/stats` | localStorage count |

The frontend already works fully offline using `localStorage`. The backend adds:
- Persistent storage across devices
- Multi-user support
- Real scan tracking analytics
- Cross-device barcode/QR code lookups
- Proper accept/claim/deliver workflow
- **Automatic cleanup** of delivered donations after 24 hours

---

## ⏰ Auto-Cleanup: Remove Delivered Donations After 24 Hours

Donations marked as "delivered" should be automatically deleted from the database after 24 hours. Use **APScheduler** (recommended for Flask) or a simple cron job.

### Option A: APScheduler (Recommended)

```bash
pip install apscheduler
```

```python
# In your main app.py or __init__.py

from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta

def cleanup_delivered_donations():
    """Remove donations that were delivered more than 24 hours ago."""
    with app.app_context():
        cutoff = datetime.utcnow() - timedelta(hours=24)
        expired = Donation.query.filter(
            Donation.status == 'delivered',
            Donation.delivered_at <= cutoff
        ).all()
        
        count = len(expired)
        for d in expired:
            db.session.delete(d)
        
        if count > 0:
            db.session.commit()
            print(f"🗑️ Auto-cleaned {count} delivered donation(s) older than 24hrs")

# Start scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(
    func=cleanup_delivered_donations,
    trigger='interval',
    minutes=30,  # Run every 30 minutes
    id='donation_cleanup',
    name='Clean up delivered donations',
    replace_existing=True
)
scheduler.start()
```

### Option B: Cleanup on Every Request (Simpler)

```python
@app.before_request
def auto_cleanup():
    """Lightweight cleanup — runs on each request but uses a flag to throttle."""
    last_cleanup = getattr(app, '_last_donation_cleanup', None)
    now = datetime.utcnow()
    
    # Only run every 30 minutes
    if last_cleanup and (now - last_cleanup).total_seconds() < 1800:
        return
    
    app._last_donation_cleanup = now
    cutoff = now - timedelta(hours=24)
    Donation.query.filter(
        Donation.status == 'delivered',
        Donation.delivered_at <= cutoff
    ).delete()
    db.session.commit()
```

### Frontend Auto-Cleanup (Already Implemented)

The scan page (`scan.md`) already runs a client-side cleanup on page load that removes from `localStorage`:
- Donations with `status = 'delivered'` where `delivered_at` is older than 24 hours
- Donations with `status = 'accepted'` or `'delivered'` where `created_at` is older than 24 hours

---

*Generated for Hunger Heroes — City of San Diego Food Security Initiative*
