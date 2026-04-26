document.addEventListener('DOMContentLoaded', function () {
	const PREVIEW_TOP_RATIO = 0.30;
	const PREVIEW_ASPECT_RATIO = 5 / 3;
	const pdfCards = Array.from(document.querySelectorAll('.training-hub-pdf'));
	const modal = document.getElementById('training-hub-pdf-modal');
	const modalTitle = document.getElementById('training-hub-pdf-title');
	const modalFrame = document.getElementById('training-hub-pdf-frame');
	const modalLink = document.getElementById('training-hub-pdf-link');

	if (!pdfCards.length || !modal || !modalTitle || !modalFrame || !modalLink) {
		return;
	}

	const pdfjsLib = window.pdfjsLib;
	if (!pdfjsLib) {
		pdfCards.forEach(function (card) {
			setStatus(card, 'Preview library failed to load. Use the new-tab link for now.');
		});
		return;
	}

	pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

	const closeButtons = Array.from(document.querySelectorAll('[data-pdf-modal-close]'));
	let activeTrigger = null;

	closeButtons.forEach(function (button) {
		button.addEventListener('click', closeModal);
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && !modal.hidden) {
			closeModal();
		}
	});

	pdfCards.forEach(function (card) {
		initializeCard(card, pdfjsLib);
	});

	async function initializeCard(card, library) {
		const source = card.dataset.pdfSrc;
		const title = card.dataset.pdfTitle || 'Training PDF';
		const button = card.querySelector('.training-hub-pdf__button');
		const viewer = card.querySelector('.training-hub-pdf__viewer');
		const canvas = card.querySelector('.training-hub-pdf__canvas');

		if (!source || !button || !viewer || !canvas) {
			setStatus(card, 'PDF path is missing for this document.');
			return;
		}

		try {
			const loadingTask = library.getDocument(source);
			const pdf = await loadingTask.promise;
			const page = await pdf.getPage(1);
			await renderPreview(page, viewer, canvas, card);

			card.dataset.pdfReady = 'true';
			button.disabled = false;
			setStatus(card, 'Preview ready. Click the cover to open the fullscreen viewer.');
			button.addEventListener('click', function () {
				openModal(source, title, button);
			});
		} catch (error) {
			card.dataset.pdfReady = 'false';
			button.disabled = true;
			setStatus(card, 'Preview unavailable until the PDF file is added at the expected path.');
			console.warn('Training Hub PDF preview failed for', title, error);
		}
	}

	async function renderPreview(page, viewer, canvas, card) {
		const pixelRatio = window.devicePixelRatio || 1;
		const viewerWidth = Math.max(Math.round(viewer.clientWidth), 1);
		const viewerHeight = Math.max(Math.round(viewer.clientHeight), 1);
		const previewTopRatio = getPreviewTopRatio(card);
		const baseViewport = page.getViewport({ scale: 1 });
		const targetAspectRatio = viewerWidth / viewerHeight || PREVIEW_ASPECT_RATIO;
		const cropY = baseViewport.height * previewTopRatio;
		const cropHeight = Math.min(
			baseViewport.height - cropY,
			baseViewport.width / targetAspectRatio
		);
		const scale = viewerWidth / baseViewport.width;
		const scaledViewport = page.getViewport({ scale: Math.max(scale, 0.9) });
		const renderCanvas = document.createElement('canvas');
		const renderContext = renderCanvas.getContext('2d');

		renderCanvas.width = Math.ceil(scaledViewport.width * pixelRatio);
		renderCanvas.height = Math.ceil(scaledViewport.height * pixelRatio);

		await page.render({
			canvasContext: renderContext,
			transform: pixelRatio === 1 ? null : [pixelRatio, 0, 0, pixelRatio, 0, 0],
			viewport: scaledViewport,
		}).promise;

		canvas.width = Math.ceil(viewerWidth * pixelRatio);
		canvas.height = Math.ceil(viewerHeight * pixelRatio);
		canvas.style.width = '100%';
		canvas.style.height = '100%';

		const context = canvas.getContext('2d');
		const sourceY = Math.max(Math.floor(cropY * scale * pixelRatio), 0);
		const sourceHeight = Math.min(
			Math.ceil(cropHeight * scale * pixelRatio),
			renderCanvas.height - sourceY
		);

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(
			renderCanvas,
			0,
			sourceY,
			renderCanvas.width,
			sourceHeight,
			0,
			0,
			canvas.width,
			canvas.height
		);
	}

	function getPreviewTopRatio(card) {
		const configuredRatio = Number.parseFloat(card.dataset.previewTop);
		if (Number.isFinite(configuredRatio) && configuredRatio >= 0 && configuredRatio <= 0.5) {
			return configuredRatio;
		}

		return PREVIEW_TOP_RATIO;
	}

	function openModal(source, title, trigger) {
		activeTrigger = trigger || null;
		modalTitle.textContent = title;
		modalLink.href = source;
		modalFrame.src = source + '#view=FitH&toolbar=1&navpanes=0';
		modal.hidden = false;
		document.body.classList.add('training-hub-modal-open');
	}

	function closeModal() {
		modal.hidden = true;
		modalFrame.removeAttribute('src');
		document.body.classList.remove('training-hub-modal-open');
		if (activeTrigger) {
			activeTrigger.focus();
		}
	}

	function setStatus(card, message) {
		const status = card.querySelector('.training-hub-pdf__status');
		if (!status) {
			return;
		}

		const pathText = status.querySelector('span');
		status.childNodes[0].textContent = message + ' ';
		if (pathText) {
			status.appendChild(pathText);
		}
	}
});