export const onKeyDown = (e) => {
    if (
        ((e.keyCode < 48 || e.keyCode > 57) &&
            (e.keyCode < 96 || e.keyCode > 105) &&
            (e.keyCode < 13 || e.keyCode > 13) &&
            (e.keyCode < 8 || e.keyCode > 9) &&
            (e.keyCode < 37 || e.keyCode > 37)) ||
        e.keyCode === 222 ||
        e.keyCode === 186
    ) {
        e.preventDefault()
    }
}
