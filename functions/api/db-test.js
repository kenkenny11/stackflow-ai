export async function onRequestGet(context) {
  try {
    const db = context.env.STACKFLOW_DB;
    if (!db) return Response.json({ok:false,connected:false,error:"STACKFLOW_DB binding is missing."},{status:503});
    const result = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('subscribers','tool_submissions') ORDER BY name").all();
    return Response.json({ok:true,connected:true,tables:result.results||[]});
  } catch (e) {
    return Response.json({ok:false,connected:false,error:"D1 connection or schema check failed."},{status:500});
  }
}
