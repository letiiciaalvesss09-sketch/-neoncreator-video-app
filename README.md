# NeonCreator AI — gerador de vídeo real

## O que já está conectado
- Texto → vídeo
- Imagem inicial → vídeo
- Consulta automática do status da geração
- Player com o vídeo final
- Chave da API protegida no servidor
- Landing page + painel local da versão anterior

## Para ativar
1. Crie uma conta de desenvolvedor na Runway e obtenha sua API Secret.
2. Instale Node.js 18+.
3. Nesta pasta, rode: `npm install`
4. Copie `.env.example` para `.env`.
5. Coloque sua chave em `RUNWAYML_API_SECRET=...`
6. Rode: `npm start`
7. Abra `http://localhost:3000`

## Importante
Não coloque a chave da API dentro do HTML/public. Ela deve ficar somente no `.env` do servidor.
A geração usa créditos pagos do provedor. Para vender acesso a clientes, ainda é recomendado adicionar autenticação, banco de dados, limites/créditos por usuário e checkout.
