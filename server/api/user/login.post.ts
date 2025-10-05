/* eslint-disable @typescript-eslint/no-unused-vars */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return true;
});
