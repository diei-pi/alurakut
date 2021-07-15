import React from 'react';
import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(propriedades){
  return(
    <div className= "profileArea" style={{gridArea: 'profileArea'}}>
      <Box>
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '10px'}}/>
        <hr />
        <p>
          <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}

          </a>
        </p>
        <hr />
        <AlurakutProfileSidebarMenuDefault />
      </Box>
    </div>
  )
}



export default function Home() {
  const user ='diei-pi';
  const [comunidades,setComunidades] = React.useState([{
    id: '12312312',
    title: 'eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  return (
  <>
    <AlurakutMenu/>
    <MainGrid>
      <ProfileSidebar githubUser = {user}/>

      <div className= "welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">Bem vindo(a)</h1>
          <OrkutNostalgicIconSet/>
        </Box>
        <Box>
          <form onSubmit={(e)=>{
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);
            const comunidade = {
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image'),
            }
            
            const comunidadesAtualizadas = [...comunidades,comunidade];
            setComunidades(comunidadesAtualizadas);
            // console.log( "campo: ",dadosDoForm.get('title'));
            // setComunidades([...comunidades,'Alura Stars']);
            
          }}>
            <h2 className="subTitle">Oque voce deseja fazer?</h2>
            <div>
              <input 
                placeholder = "Qual vai ser o nome da comunidade?"
                name="title"
                aria-label = "Qual vai ser o nome da comunidade?"
                type="text"
              />
            </div>
            <div>
              <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name = "image"
                aria-label = "Coloque uma URL para usarmos de capa"
              />
              </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>

      <div className= "profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className= "smallTitle">
          Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((item)=>{
              return (
                  <li key={item.id} >
                    <a href={`/users/${item.title}`} key={item.title}>
                      <img src={item.image}/>
                      <span>{item.title}</span>
                    </a>
                  </li> 
                  );
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className= "smallTitle">
           Pessoas Da Comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
            {pessoasFavoritas.map((item)=>{
              return (
                  <li key={item}>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`https://github.com/${item}.png`}/>
                      <span>{item}</span>
                    </a>
                  </li> 
                  );
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
  </>
  );
}
