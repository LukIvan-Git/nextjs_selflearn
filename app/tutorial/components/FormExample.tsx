"use client"
import React, { JSX, useState } from "react";
import axios from 'axios';

type FormState = {
  name: string;
  email: string;
};

export default function FormExample(): React.JSX.Element {
  const [form, setForm] = useState<FormState>({ name: "", email: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [responseText, setResponseText] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResponseText(null);
    try {
      const res = await axios.post('/api/submit', form, { headers: { 'Content-Type': 'application/json' } });
      setResponseText(JSON.stringify(res.data));
    } catch (err: any) {
      if (err.response) setResponseText(`Error: ${JSON.stringify(err.response.data)}`);
      else setResponseText(`Error: ${err?.message ?? String(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{border: '1px solid #ccc', padding: 12, borderRadius: 6, color: '#111', background: '#fff'}}>
      <form onSubmit={handleSubmit} style={{display: 'grid', gap: 8}}>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span>Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{padding: '6px 8px', border: '1px solid #bbb', borderRadius: 4, color: '#111'}}
          />
        </label>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <span>Email</span>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{padding: '6px 8px', border: '1px solid #bbb', borderRadius: 4, color: '#111'}}
          />
        </label>
        <div style={{display: 'flex', gap: 8}}>
          <button type="submit" style={{background: '#0366d6', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4}}>Submit</button>
          <button type="button" onClick={() => setForm({ name: "", email: "" })} style={{background: '#e2e8f0', color: '#111', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: 4}}>Clear</button>
        </div>
      </form>

        <div style={{marginTop: 12, fontSize: 13}}>
          <strong>Current state:</strong>
          <pre style={{background: '#f3f4f6', padding: 8, color: '#111'}}>{JSON.stringify(form, null, 2)}</pre>
        </div>

        <div style={{marginTop: 8, fontSize: 13, color: '#333'}}>
          <p style={{margin: 0}}>Vue's <code style={{background: '#f3f4f6', padding: '2px 6px'}}>v-model</code> binds input to component data. React uses controlled inputs with state and change handlers.</p>
        </div>

        <div style={{marginTop: 10}}>
          <strong>Server response:</strong>
          <div style={{marginTop: 6}}>{submitting ? 'Submitting...' : responseText ?? 'No response yet.'}</div>
        </div>
    </div>
  );
}
