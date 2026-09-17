document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.md-sidebar--primary');
  if (!sidebar) return;

  const MIN_WIDTH = 180;
  const MAX_WIDTH = 500;
  let isDragging = false;
  let startX = 0;
  let startWidth = 0;

  const handle = document.createElement('div');
  handle.className = 'md-sidebar-drag-handle';
  handle.setAttribute('aria-label', 'ドラッグしてサイドバー幅を変更');
  sidebar.appendChild(handle);

  const updateWidth = function (newWidth) {
    const width = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
    sidebar.style.width = width + 'px';
    sidebar.style.flexBasis = width + 'px';
    document.documentElement.style.setProperty('--md-sidebar-width', width + 'px');
  };

  handle.addEventListener('pointerdown', function (event) {
    if (event.button !== 0) return;
    isDragging = true;
    startX = event.clientX;
    startWidth = sidebar.getBoundingClientRect().width;
    document.body.setAttribute('data-sidebar-dragging', 'true');
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener('pointermove', function (event) {
    if (!isDragging) return;
    const dx = event.clientX - startX;
    updateWidth(startWidth + dx);
  });

  handle.addEventListener('pointerup', function (event) {
    isDragging = false;
    document.body.removeAttribute('data-sidebar-dragging');
    handle.releasePointerCapture(event.pointerId);
  });

  handle.addEventListener('pointerleave', function () {
    if (!isDragging) return;
    isDragging = false;
    document.body.removeAttribute('data-sidebar-dragging');
  });

  window.addEventListener('pointerup', function () {
    if (!isDragging) return;
    isDragging = false;
    document.body.removeAttribute('data-sidebar-dragging');
  });

  window.addEventListener('pointermove', function (event) {
    if (!isDragging) return;
    const dx = event.clientX - startX;
    updateWidth(startWidth + dx);
  });
});
