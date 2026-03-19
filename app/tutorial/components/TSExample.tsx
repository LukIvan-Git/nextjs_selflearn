"use client"
import React, { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email?: string; // optional field
};

type GreetingProps = {
  title: string;
  count?: number;
};

function Greeting({ title, count = 0 }: GreetingProps): React.JSX.Element {
  return (
    <div style={{padding: 12, border: '1px solid #ddd', borderRadius: 6}}>
      <h3 style={{margin: 0}}>{title}</h3>
      <p style={{margin: '6px 0 0 0'}}>Count: {count}</p>
    </div>
  );
}

export default function TSExample(): React.JSX.Element {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Example of typing an async fetch and the response
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // This URL returns placeholder JSON; in a real app type the API model
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: User[] = await res.json();
        if (mounted) setUsers(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false };
  }, []);

  // Example of a typed event handler
  const handleAdd = () => {
    const next: User = { id: Date.now(), name: 'New User' };
    setUsers((prev) => (prev ? [...prev, next] : [next]));
  };

  return (
    <div style={{display: 'grid', gap: 12}}>
      <Greeting title="TypeScript + React examples" count={users?.length} />

      <div style={{padding: 12, border: '1px solid #eee', borderRadius: 6}}>
        <strong>Key ideas:</strong>
        <ul>
          <li>Use <code>type</code> or <code>interface</code> for props and API shapes.</li>
          <li>Give state and hooks explicit generic types like <code>useState&lt;User[]&gt;</code>.</li>
          <li>Type event handlers: <code>React.ChangeEvent&lt;HTMLInputElement&gt;</code>.</li>
          <li>Prefer precise types for API responses and mark optional fields with <code>?</code>.</li>
        </ul>
      </div>

      <div style={{padding: 12, border: '1px solid #eee', borderRadius: 6}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <strong>Users (example)</strong>
          <div style={{display: 'flex', gap: 8}}>
            <button onClick={handleAdd} style={{padding: '6px 8px'}}>Add</button>
          </div>
        </div>

        <div style={{marginTop: 8}}>
          {loading && <div>Loading...</div>}
          {!loading && !users && <div>No users yet.</div>}
          {users && (
            <ol style={{margin: '8px 0 0 18px'}}>
              {users.map((u) => (
                <li key={u.id} style={{marginBottom: 6}}>
                  <strong>{u.name}</strong>{u.email ? ` — ${u.email}` : ''}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
