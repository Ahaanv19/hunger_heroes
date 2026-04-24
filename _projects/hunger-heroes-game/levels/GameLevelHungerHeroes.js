/**
 * GameLevelHungerHeroes.js
 *
 * A donation-themed game level for Hunger Heroes.
 * Uses the shared GameEngine v1.1 published in this site's assets.
 *
 * The player walks around a food bank scene, interacting with NPCs
 * that represent donation stations. Each NPC teaches about the donation
 * process: Create → Browse → Match → Deliver → Verify.
 *
 * Interactions trigger real donation API calls or navigation to pages.
 */
import GameEnvBackground from '../../../GameEnginev1.1/essentials/GameEnvBackground.js';
import Player from '../../../GameEnginev1.1/essentials/Player.js';
import Npc from '../../../GameEnginev1.1/essentials/Npc.js';
import SpriteGenerator from './SpriteGenerator.js';

class GameLevelHungerHeroes {
  // Metadata for engine
  static levelId = 'hunger-heroes-foodbank';
  static displayName = 'Food Bank Adventure';

  constructor(gameEnv) {
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
    const path = gameEnv.path;

    // ── Background ──────────────────────────────────────────────────────
    const bgSrc = SpriteGenerator.createBackground('foodbank');
    const bgData = {
      name: 'Food Bank',
      greeting: 'Welcome to the Hunger Heroes Food Bank! Walk around and talk to the NPCs to learn about donating food.',
      src: bgSrc,
      pixels: { height: 600, width: 1200 },
    };

    // ── Hero / Player ────────────────────────────────────────────────────
    const heroSrc = SpriteGenerator.createHeroSprite();
    const HERO_SCALE = 6;
    const heroData = {
      id: 'HungerHero',
      greeting: 'I am the Hunger Hero! I help connect food donors with people in need.',
      src: heroSrc,
      SCALE_FACTOR: HERO_SCALE,
      STEP_FACTOR: 800,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: width * 0.1, y: height - height / HERO_SCALE - 20 },
      pixels: { height: 512, width: 512 },
      orientation: { rows: 4, columns: 4 },
      down:      { row: 0, start: 0, columns: 4 },
      right:     { row: 1, start: 0, columns: 4 },
      left:      { row: 2, start: 0, columns: 4 },
      up:        { row: 3, start: 0, columns: 4 },
      hitbox: { widthPercentage: 0.4, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 },
    };

    // ── NPC 1: Create Station 📦 ─────────────────────────────────────
    const createNpcSrc = SpriteGenerator.createNpcSprite('📦', '#3b82f6', 'CREATE');
    const createNpcData = {
      id: 'CreateStation',
      greeting: '📦 Welcome to the Create Station! Here you can register a new food donation. Fill out details like food name, allergens, expiry date, and generate a scannable barcode label!',
      src: createNpcSrc,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 200,
      pixels: { width: 384, height: 128 },
      INIT_POSITION: { x: width * 0.2, y: height * 0.55 },
      orientation: { rows: 1, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        '📦 Ready to donate food? Head to the Create page!',
        '🏷️ We generate QR code labels for every donation.',
        '📝 Fill in food name, allergens, quantity, and expiry date.',
        '🔄 Donations are saved to both Spring and Flask backends!',
        '✅ After creating, you get a printable barcode label.',
      ],
      interact: function () {
        this.showReactionDialogue();
      },
    };

    // ── NPC 2: Browse Station 🔍 ─────────────────────────────────────
    const browseNpcSrc = SpriteGenerator.createNpcSprite('🔍', '#8b5cf6', 'BROWSE');
    const browseNpcData = {
      id: 'BrowseStation',
      greeting: '🔍 This is the Browse Station! You can see all available donations, sort by expiry or quantity, and filter by status.',
      src: browseNpcSrc,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 200,
      pixels: { width: 384, height: 128 },
      INIT_POSITION: { x: width * 0.38, y: height * 0.45 },
      orientation: { rows: 1, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        '🔍 Browse all donations sorted by date, expiry, or quantity!',
        '📊 Filter by status: Active, Accepted, In Transit, Delivered.',
        '⏰ Urgent donations expiring soon are highlighted.',
        '☕ Data comes from Spring first, with Flask fallback.',
      ],
      interact: function () {
        this.showReactionDialogue();
      },
    };

    // ── NPC 3: Match Station 🤝 ──────────────────────────────────────
    const matchNpcSrc = SpriteGenerator.createNpcSprite('🤝', '#10b981', 'MATCH');
    const matchNpcData = {
      id: 'MatchStation',
      greeting: '🤝 The Match Station helps receivers find food near them! Enter your zip code and dietary preferences for smart matching.',
      src: matchNpcSrc,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 200,
      pixels: { width: 384, height: 128 },
      INIT_POSITION: { x: width * 0.55, y: height * 0.55 },
      orientation: { rows: 1, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        '🤝 Find food matching your dietary needs and location!',
        '📍 We match by zip code (first 3 digits).',
        '🥬 Filter by vegetarian, vegan, halal, gluten-free, and more.',
        '⚠️ Exclude allergens like peanuts, dairy, shellfish.',
        '🎯 Spring does server-side matching; Flask uses client-side filtering.',
      ],
      interact: function () {
        this.showReactionDialogue();
      },
    };

    // ── NPC 4: Deliver Station 🚚 ───────────────────────────────────
    const deliverNpcSrc = SpriteGenerator.createNpcSprite('🚚', '#f59e0b', 'DELIVER');
    const deliverNpcData = {
      id: 'DeliverStation',
      greeting: '🚚 The Deliver Station tracks donation status! Manage the lifecycle: Active → Accepted → In Transit → Delivered.',
      src: deliverNpcSrc,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 200,
      pixels: { width: 384, height: 128 },
      INIT_POSITION: { x: width * 0.72, y: height * 0.45 },
      orientation: { rows: 1, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        '🚚 Track every donation from creation to delivery!',
        '📋 Active → 🤝 Accepted → 🚚 In Transit → 📦 Delivered',
        '↩️ You can undo actions to revert status changes.',
        '❌ Cancel donations that can no longer be fulfilled.',
        '🔄 Status updates sync to both Spring and Flask.',
      ],
      interact: function () {
        this.showReactionDialogue();
      },
    };

    // ── NPC 5: Scan Station 📱 ──────────────────────────────────────
    const scanNpcSrc = SpriteGenerator.createNpcSprite('📱', '#ef4444', 'SCAN');
    const scanNpcData = {
      id: 'ScanStation',
      greeting: '📱 Scan & Verify! Use the QR scanner or enter a donation ID to see full details. Volunteers can assign themselves and update status.',
      src: scanNpcSrc,
      SCALE_FACTOR: 6,
      ANIMATION_RATE: 200,
      pixels: { width: 384, height: 128 },
      INIT_POSITION: { x: width * 0.88, y: height * 0.55 },
      orientation: { rows: 1, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        '📱 Scan QR codes to look up any donation instantly!',
        '🔎 Or type in the donation ID manually.',
        '🦸 Volunteers can assign themselves to deliveries.',
        '📊 View full details: food name, allergens, expiry, donor info.',
        '🏷️ Print replacement labels right from the scan page.',
      ],
      interact: function () {
        this.showReactionDialogue();
      },
    };

    // ── Build the level class list ──────────────────────────────────────
    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: heroData },
      { class: Npc, data: createNpcData },
      { class: Npc, data: browseNpcData },
      { class: Npc, data: matchNpcData },
      { class: Npc, data: deliverNpcData },
      { class: Npc, data: scanNpcData },
    ];
  }
}

export default GameLevelHungerHeroes;
