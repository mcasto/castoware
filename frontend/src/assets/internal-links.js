/**
 * Click handler for containers rendering server HTML via v-html. Plain <a>
 * tags would trigger a full page reload, so links that match an app route are
 * routed client-side instead.
 */
export default (router) => (event) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const link = event.target.closest("a[href]");
  if (!link || (link.target && link.target !== "_self")) {
    return;
  }

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) {
    return;
  }

  // The catch-all 404 route is unnamed, so only named routes are app pages
  const path = url.pathname + url.search + url.hash;
  if (!router.resolve(path).name) {
    return;
  }

  event.preventDefault();
  router.push(path);
};
