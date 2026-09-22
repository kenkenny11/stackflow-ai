export async function onRequestPost(context) {
  try {
    const db = context.env.STACKFLOW_DB;
    if (!db) return Response.json({ok:false,error:"Newsletter storage is not connected yet."},{status:503});
    const data = await context.request.json();
    if (String(data.website||"").trim()) return Response.json({ok:true});
    const email = String(data.email||"").trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) return Response.json({ok:false,error:"Enter a valid email address."},{status:400});
    await db.prepare("INSERT OR IGNORE INTO subscribers (email, created_at) VALUES (?, datetime('now'))").bind(email).run();
    return Response.json({ok:true,message:"You're subscribed."});
  } catch (e) { return Response.json({ok:false,error:"Could not save the subscription."},{status:500}); }
}