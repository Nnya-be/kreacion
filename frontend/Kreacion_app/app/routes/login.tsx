// app/routes/login.tsx
import { Form, useActionData } from '@remix-run/react';
import { ActionFunction, redirect, json } from '@remix-run/node';
import { loginUser } from '../models/user.server';

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return json<ActionData>({ error: 'Invalid Form Data' }, { status: 400 });
  }

  const user = await loginUser(email, password);
  if (!user) {
    return json<ActionData>({ error: 'Invalid login credentials' }, { status: 401 });
  }

  // Set session and redirect
  return redirect('/dashboard');
};

export default function LoginPage() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Form method="post">
          <div className="mb-4">
            <label htmlFor='email' className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor='Password' className="block mb-2 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
