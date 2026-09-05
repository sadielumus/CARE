import { careCaseByModule } from '@/lib/cases';
const criteria=['Context','Authority','Risk and reversibility','Engagement','Professional judgment and safeguards'];
export async function POST(request:Request){
 const key=process.env.OPENAI_API_KEY;
 if(!key)return Response.json({error:'The feedback service is not configured.'},{status:503});
 const body=await request.json(); const item=careCaseByModule(Number(body.module));
 if(!item)return Response.json({error:'Select a valid module.'},{status:400});
 const schema={type:'object',additionalProperties:false,required:['ratings','followUpQuestions','overallNote'],properties:{ratings:{type:'array',minItems:5,maxItems:5,items:{type:'object',additionalProperties:false,required:['criterion','rating','strength','improvement'],properties:{criterion:{type:'string',enum:criteria},rating:{type:'string',enum:['Strong','Developing','Revisit']},strength:{type:'string'},improvement:{type:'string'}}}},followUpQuestions:{type:'array',maxItems:2,items:{type:'string'}},overallNote:{type:'string'}}};
 const instructions=`You are a formative CARE Practice Coach for graduate social work students. Evaluate only the student's reasoning about the supplied fictional case. CARE means Context, Authority, Risk, and Engagement. Do not decide for the student, supply a model answer, invent facts, or give legal or clinical advice. Strong means specific and connected to judgment; Developing recognizes the issue but leaves important complexity unclear; Revisit is generic or misses an essential consideration. Always examine harm if technology is wrong, who bears it, reversibility, meaningful human authority, participation, safeguards, stop conditions, and fallback. Return concise feedback with exactly five criteria and no more than two focused questions.`;
 const api=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${key}`},body:JSON.stringify({model:'gpt-5-mini',instructions,input:JSON.stringify({fictionalCase:item,studentAnswers:body.answers,moduleFeedbackPriorities:item.priorities}),text:{format:{type:'json_schema',name:'care_feedback',strict:true,schema}}})});
 if(!api.ok){console.error('OpenAI error',api.status);return Response.json({error:'Feedback could not be generated. Please try again.'},{status:502});}
 const data=await api.json(); const text=data.output?.flatMap((x:any)=>x.content??[]).find((x:any)=>x.type==='output_text')?.text;
 if(!text)return Response.json({error:'No feedback was returned.'},{status:502});
 return Response.json(JSON.parse(text));
}
