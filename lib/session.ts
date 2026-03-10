const SESSION_KEY = "wedding-photos-session";

type StoredSession = {
  accessToken: string;
  refreshToken: string;
};

export function saveSession(accessToken: string, refreshToken: string) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ accessToken, refreshToken }),
  );
}

export function getSession(): StoredSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredSession;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
