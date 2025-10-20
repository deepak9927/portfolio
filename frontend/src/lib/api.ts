const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('jwt_token');

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    throw error;
  }
}

export const signupUser = (data: any) => {
  return request('/api/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const loginUser = (data: any) => {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getQuestions = () => {
  return request('/api/questions');
};

export const submitQuiz = (data: any) => {
  return request('/api/submit-quiz', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getLeaderboard = () => {
  return request('/api/leaderboard');
};
