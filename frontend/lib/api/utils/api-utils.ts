export const handleResponse = async <T>(
  response: Response,
): Promise<T | null> => {
  if (!response.ok) {
    throw new Error((await response.json())?.message ?? 'An error occurred');
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : null;
};
