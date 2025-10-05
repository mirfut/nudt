export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFrom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]!;
}

export async function loginUser(
    username: string,
    password: string
): Promise<boolean> {
    const result = await $fetch<boolean>("/api/user/login", {
        method: "post",
        body: { username, password },
    });
    return result;
}
