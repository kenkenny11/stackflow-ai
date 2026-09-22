export async function onRequestPost(context) {
  try {
    const db = context.env.STACKFLOW_DB;
    if (!db) return Response.json({ok:false,error:"Submission storage is not connected yet."},{status:503});
    const data = await context.request.json();
    if (String(data.website||"").trim()) return Response.json({ok:true});
    const name=String(data.name||"").trim(), url=String(data.url||"").trim(), category=String(data.category||"").trim(), pricing=String(data.pricing||"").trim(), description=String(data.description||"").trim(), contact=String(data.contact||"").trim(), listing=String(data.listing||"standard").trim();
    if(!name||!url||!category||!contact) return Response.json({ok:false,error:"Please complete the required fields."},{status:400});
    if(!/^https?:\/\//i.test(url)) return Response.json({ok:false,error:"Tool URL must start with http:// or https://."},{status:400});
    if(name.length>120||description.length>2000||contact.length>200) return Response.json({ok:false,error:"One or more fields are too long."},{status:400});
    await db.prepare("INSERT INTO tool_submissions (name,url,category,pricing,description,contact,listing,status,created_at) VALUES (?,?,?,?,?,?,?,'pending',datetime('now'))").bind(name,url,category,pricing,description,contact,listing).run();
    return Response.json({ok:true,message:"Submission received."});
  } catch(e) { return Response.json({ok:false,error:"Could not save the submission."},{status:500}); }
}