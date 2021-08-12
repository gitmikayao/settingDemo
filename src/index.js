function Setting() {
    let offsetX = 0;
    let offsetY = 0;
    let isStart = false;
    let startX = 0;
    let startY = 0;
    let fold = true;
    const ctrlEl = document.querySelector("#ctrl");
    const outer = document.querySelector("#outer");
    const itemWrapper = document.querySelector("#itemWrapper");
    const triangle = document.querySelector("#triangle");
    ctrlEl.addEventListener("mousedown", (event) => {
        const { left, top } = ctrlEl.getBoundingClientRect();
        isStart = true;
        startX = event.pageX;
        startY = event.pageY;
        offsetX = event.clientX - left;
        offsetY = event.clientY - top;
    });

    document.addEventListener("mousemove", (event) => {
        if (isStart) {
            outer.style.left = `${event.clientX - offsetX}px`;
            outer.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", (event) => {
        if (isStart) {
            const deltaX = event.pageX - startX;
            const deltaY = event.pageY - startY;
            if (deltaX || deltaY) {
                const targetLeft = Math.min(
                    Math.max(event.clientX - offsetX, -32),
                    window.innerWidth - 32,
                );
                const targetTop = Math.min(
                    Math.max(event.clientY - offsetY, 0),
                    window.innerHeight - 32,
                );
                outer.style.left = `${targetLeft}px`;
                outer.style.top = `${targetTop}px`;
            } else if (fold) { // 如果折叠的，就展开
                fold = false;
                itemWrapper.style.display = "flex";
                triangle.style.display = "block";
            } else { // 如果展开的，就折叠
                fold = true;
                itemWrapper.style.display = "none";
                triangle.style.display = "none";
            }
        }
        isStart = false;
    });
}

Setting();