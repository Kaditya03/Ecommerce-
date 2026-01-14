// src/services/userService.ts

export async function registerUser(data: any) {
  return {
    success: true,
    userId: "demo_user_id",
  };
}

export async function loginUser(data: any) {
  return {
    success: true,
    token: "demo_token",
  };
}

export async function getUserProfile(userId: string) {
  return null;
}
