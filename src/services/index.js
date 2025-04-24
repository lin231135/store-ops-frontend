export async function loginEmpleado(username, password) {
    const res = await fetch("/api/employee/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
} 