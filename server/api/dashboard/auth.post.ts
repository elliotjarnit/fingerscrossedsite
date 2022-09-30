export default eventHandler(async (event) => {
    const body = await useBody(event);
    return body.auth === process.env.DASHBOARD_PASS
})