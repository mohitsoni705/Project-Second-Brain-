export function random(len) {
    const option = "qwertyuiopasdfghjklzxcvbnm1234567890";
    const length = option.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += option[Math.floor(Math.random() * length)];
    }
    return ans;
}
//# sourceMappingURL=utils.js.map