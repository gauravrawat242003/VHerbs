export function navigateToRoute(navigate, route, behaviour='instant') {
    navigate(route);
    window.scroll({
        top: 0,
        behavior: behaviour,
    });
}