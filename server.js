import 'dotenv/config';
import express from 'express';
import RunwayML from '@runwayml/sdk';

const app = express();
app.use(express.json({limit:'15mb'}));
app.use(express.static('public'));

function client(){
  if(!process.env.RUNWAYML_API_SECRET) throw new Error('RUNWAYML_API_SECRET não configurada no servidor.');
  return new RunwayML({apiKey:process.env.RUNWAYML_API_SECRET});
}

app.post('/api/generate', async (req,res)=>{
  try{
    const {promptText,promptImage,ratio='1280:720',duration=5,model='gen4.5'}=req.body||{};
    if(!promptText) return res.status(400).json({error:'Prompt obrigatório.'});
    const allowedModels=new Set(['gen4.5','grok_imagine_1_5_lite']);
    if(!allowedModels.has(model)) return res.status(400).json({error:'Modelo não permitido.'});
    const payload={model,promptText,duration:Number(duration)};
    if(promptImage){
      payload.promptImage=promptImage;
      payload.ratio=model==='grok_imagine_1_5_lite' ? (ratio==='720:1280'?'auto_720p':'auto_720p') : ratio;
    } else {
      payload.ratio=ratio;
    }
    const task=await client().imageToVideo.create(payload);
    res.json(task);
  }catch(err){res.status(500).json({error:err?.message||'Erro ao gerar vídeo.'})}
});

app.get('/api/task/:id', async (req,res)=>{
  try{
    const task=await client().tasks.retrieve(req.params.id);
    res.json(task);
  }catch(err){res.status(500).json({error:err?.message||'Erro ao consultar tarefa.'})}
});

const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`NeonCreator em http://localhost:${port}`));
