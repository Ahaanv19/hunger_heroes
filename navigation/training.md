---
layout: post
title: Training Hub
nav: true
search_exclude: true
permalink: /training-hub/
---

{% assign food_safety_pdf = '/assets/pdfs/training/food-safety-handbook.pdf' | relative_url %}
{% assign donor_checklist_pdf = '/assets/pdfs/training/donor-checklist.pdf' | relative_url %}
{% assign receiver_checklist_pdf = '/assets/pdfs/training/receiver-checklist.pdf' | relative_url %}

<div class="training-hub-page">
	<section class="training-hub-hero">
		<p class="training-hub-hero__eyebrow">Training Hub</p>
		<h1>Volunteer training materials, checklists, and interactive practice in one place.</h1>
		<p>
			This page is set up as the base layout for future training resources. The handbook and checklist
			areas are ready for file embeds, the quiz area is reserved for knowledge checks, and the game area
			is prepared for the Training Hub project experience.
		</p>
	</section>

	<section class="training-hub-section">
		<div class="training-hub-section__header">
			<h2>Training Resources</h2>
			<p>
				Each file will show a cover-page preview here. Clicking the preview opens a fullscreen viewer for the
				full PDF.
			</p>
		</div>

		<div class="training-hub-grid">
			<article class="training-hub-card">
				<div class="training-hub-card__tag">General</div>
				<h3>Food Safety Handbook</h3>
				<p>Food handling standards, storage guidance, and volunteer safety procedures.</p>
				<div class="training-hub-pdf" data-pdf-title="Food Safety Handbook" data-pdf-src="{{ food_safety_pdf }}">
					<button class="training-hub-pdf__button" type="button" disabled>
						<span class="training-hub-pdf__viewer">
							<canvas class="training-hub-pdf__canvas" aria-hidden="true"></canvas>
							<span class="training-hub-pdf__placeholder">
								<strong>Food Safety Handbook</strong>
								<span class="training-hub-pdf__placeholder-note">Cover preview loads automatically when the PDF is available.</span>
							</span>
							<span class="training-hub-pdf__overlay">Open fullscreen</span>
						</span>
					</button>
					<div class="training-hub-pdf__meta">
						<a class="training-hub-pdf__link" href="{{ food_safety_pdf }}" target="_blank" rel="noopener">Open in new tab</a>
						<p class="training-hub-pdf__status">Expected file: <span>assets/pdfs/training/food-safety-handbook.pdf</span></p>
					</div>
				</div>
			</article>

			<article class="training-hub-card">
				<div class="training-hub-card__tag">Donors</div>
				<h3>Donor Checklist</h3>
				<p>Donor-side prep steps, packaging rules, and handoff reminders before pickup.</p>
				<div class="training-hub-pdf" data-pdf-title="Donor Checklist" data-pdf-src="{{ donor_checklist_pdf }}">
					<button class="training-hub-pdf__button" type="button" disabled>
						<span class="training-hub-pdf__viewer">
							<canvas class="training-hub-pdf__canvas" aria-hidden="true"></canvas>
							<span class="training-hub-pdf__placeholder">
								<strong>Donor Checklist</strong>
								<span class="training-hub-pdf__placeholder-note">Cover preview loads automatically when the PDF is available.</span>
							</span>
							<span class="training-hub-pdf__overlay">Open fullscreen</span>
						</span>
					</button>
					<div class="training-hub-pdf__meta">
						<a class="training-hub-pdf__link" href="{{ donor_checklist_pdf }}" target="_blank" rel="noopener">Open in new tab</a>
						<p class="training-hub-pdf__status">Expected file: <span>assets/pdfs/training/donor-checklist.pdf</span></p>
					</div>
				</div>
			</article>

			<article class="training-hub-card">
				<div class="training-hub-card__tag">Receivers</div>
				<h3>Receiver Checklist</h3>
				<p>Receiver intake steps, confirmation flow, and delivery acceptance checks.</p>
				<div class="training-hub-pdf" data-pdf-title="Receiver Checklist" data-pdf-src="{{ receiver_checklist_pdf }}">
					<button class="training-hub-pdf__button" type="button" disabled>
						<span class="training-hub-pdf__viewer">
							<canvas class="training-hub-pdf__canvas" aria-hidden="true"></canvas>
							<span class="training-hub-pdf__placeholder">
								<strong>Receiver Checklist</strong>
								<span class="training-hub-pdf__placeholder-note">Cover preview loads automatically when the PDF is available.</span>
							</span>
							<span class="training-hub-pdf__overlay">Open fullscreen</span>
						</span>
					</button>
					<div class="training-hub-pdf__meta">
						<a class="training-hub-pdf__link" href="{{ receiver_checklist_pdf }}" target="_blank" rel="noopener">Open in new tab</a>
						<p class="training-hub-pdf__status">Expected file: <span>assets/pdfs/training/receiver-checklist.pdf</span></p>
					</div>
				</div>
			</article>
		</div>
	</section>

	<section class="training-hub-section">
		<div class="training-hub-section__header">
			<h2>Practice and Assessment</h2>
			<p>This area separates future quiz content from the interactive training game.</p>
		</div>

		<div class="training-hub-lower">
			<article class="training-hub-quiz">
				<h3>Training Quiz</h3>
				<p>
					This section is reserved for a future quiz or checkpoint experience once the questions and scoring
					flow are finalized.
				</p>
				<ul class="training-hub-quiz__list">
					<li>Title area is in place for a future quiz module.</li>
					<li>Space is reserved for instructions, score feedback, or completion messaging.</li>
					<li>The final embed, form, or script can be mounted here later.</li>
				</ul>
			</article>

			<article class="training-hub-game">
				<h3>Training Game</h3>
				<p>
					This section is reserved for the interactive training game sourced from the Training Hub project in
					<code>_projects/training-hub/training-game</code>.
				</p>
				<div class="training-hub-game__shell" id="training-game-root">
					<div>
						<strong>Game mount point ready</strong>
						<p class="training-hub-game__status">Connect the training game here when its published page or embed target is available.</p>
					</div>
				</div>
			</article>
		</div>
	</section>
</div>

<div class="training-hub-modal" id="training-hub-pdf-modal" hidden>
	<div class="training-hub-modal__backdrop" data-pdf-modal-close></div>
	<div class="training-hub-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="training-hub-pdf-title">
		<div class="training-hub-modal__header">
			<div>
				<p class="training-hub-modal__eyebrow">Document Viewer</p>
				<h2 id="training-hub-pdf-title">Training PDF</h2>
			</div>
			<div class="training-hub-modal__actions">
				<a class="training-hub-modal__link" id="training-hub-pdf-link" href="#" target="_blank" rel="noopener">Open in new tab</a>
				<button class="training-hub-modal__close" type="button" data-pdf-modal-close aria-label="Close document viewer">Close</button>
			</div>
		</div>
		<div class="training-hub-modal__body">
			<iframe class="training-hub-modal__frame" id="training-hub-pdf-frame" title="Training PDF Viewer" loading="lazy"></iframe>
		</div>
	</div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="{{ '/assets/js/training-hub-pdfs.js' | relative_url }}"></script>

