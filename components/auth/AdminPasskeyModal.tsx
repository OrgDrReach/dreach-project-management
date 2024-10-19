'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPasskeyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/admin-passkey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passkey }),
    });

    if (response.ok) {
      router.push('/admin-dashboard');
    } else {
      setError('Invalid passkey');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 text-sm text-gray-600 underline"
      >
        Admin Access
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Admin Access</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="passkey" className="block mb-2">Admin Passkey</label>
                <input
                  id="passkey"
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
