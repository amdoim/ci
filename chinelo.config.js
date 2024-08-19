const url = (process.env.NODE_ENV == 'prod') ? 'https://dinheirus.com' : "http://192.168.0.109:3000"

const textInicio = `<p>&nbsp O projeto Dinheirus.com, idealizado pelo professor Júnior Alves, tem como base a criação de um sistema simulado, inspirado no capitalismo, com o objetivo de ensinar e incentivar os alunos a aprenderem sobre investimentos, empreendedorismo e gestão financeira pessoal. O projeto não consiste em uma moeda real, mas possui sua própria geração de juros, impostos, empreendimentos, investimentos, multas e bônus, além de uma inflação simulada. Essa iniciativa não tem fins lucrativos e conta com o apoio de outros professores e interessados no ensino de educação financeira para os jovens estudantes do ensino médio técnico.</p>
<p>&nbsp Ele, o Dinheirus.com, consiste em incentivar os alunos a se interessarem pelas suas finanças pessoais, utilanzando a tecnologia como aliado.O projeto inclui a oferta de bônus garantidos por participação ativa dos estudantes dentro da escola, seja jogos internos e externos, proatividade nas aulas e ao final do ano letivo é ofertada uma feira a qual os estudantes usarão seu saldo final para adquirirem recompensas das demais variadas. O incentivo gerado pelos educadores das instituições de ensino com essa dinâmica divertida e simples, agora nos dispositiveis móveis facilitando o uso do sistema.</p>`

export const globalConfig = {
    title: 'Dinheirus - D$',
    port: 3000,
    mainUrl: url,
    rootPath: __dirname,
    maxAge: 60000,
    textInicio: textInicio,
}

/**
 * sudo docker image build -t umruivo/dinheirus:0.1.36.1 .
 * sudo docker push umruivo/dinheirus:0.1.36.1
 * docker exec dinheirus bun prisma migrate dev
 * docker exec -it dinheirus bash
 * 
 * 
 */