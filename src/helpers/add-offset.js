export function addOffset(map) {
    var offset = map.getSize().y * 0.15;
    map.panBy(new L.Point(0, -offset), { animate: true });
}