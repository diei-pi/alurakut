import jwt from 'jsonwebtoken'; 
import nookies from 'nookies';
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

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
          <h2 className= "smallTitle">
          {propriedades.title} ({propriedades.items.length})
          </h2>
          <ul>
            {propriedades.items.map((item,index)=>{
                  if(index <= 5){
                    return (
                      <li key={item.id} >
                      <a href={`/users/${item.title}`} key={item.title}>
                        <img src={item.avatar_url}/>
                        <span>{item.login}</span>
                      </a>
                    </li> 
                    );
                  }else{
                    return;
                  }

            })}
          </ul>
        </ProfileRelationsBoxWrapper>
  )
}



export default function Home(props) {
  const user =props.githubUser;
  const [comunidades,setComunidades] = React.useState([{
    id: '12312312',
    title: 'eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'chico3434',
    'ovvesley',
    'amaral220x',
    'gddeazevedo',
    'enzo-z',
    'Robootic',
    'GhigginoD',
    'Nogueirinha',

  ];
  const [seguidores, setSeguidores] = React.useState([]);
  const [i,setI] = React.useState(0);
  React.useEffect(function (){
    fetch('https://api.github.com/users/diei-pi/followers')
    .then((respostaDoServidor)=>{
      return respostaDoServidor.json();
  })
    .then((respostaConvertida)=>{
      setSeguidores(respostaConvertida);
      setI(i+1);
  })

    fetch('https://graphql.datocms.com/',{
      method: 'POST',
      headers: {
        'Authorization' : '697912775f904057448b7337fd4cef',
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
      },
      body: JSON.stringify({"query": `query {
        allCommunities{
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((response)=> response.json()) // return response.json()
    .then((respostaCompleta)=>{
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato);
      
    })
  },[]);


  return (
  <>
    <AlurakutMenu/>
    <MainGrid>
      <ProfileSidebar githubUser = {user} />

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
              title: dadosDoForm.get('title'),
              image_url: dadosDoForm.get('image'),
              creator_slug: user
            }
            fetch('./api/comunidades',{
              method: 'POST',
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(comunidade),
            })
            .then(async (response)=>{
              const dados = await response.json();
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades,comunidade];
              setComunidades(comunidadesAtualizadas);
            })
            
            
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
        
        <ProfileRelationsBox title="Seguidores" items={seguidores} />

        <ProfileRelationsBoxWrapper>
          <h2 className= "smallTitle">
          Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((item)=>{
              return (
                  <li key={item.id}>
                    <a href={`/users/${item.title}`} key={item.title}>
                      <img src={item.imageUrl}/>
                      <span>{item.title}</span>
                    </a>
                  </li> 
                  );
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className= "smallTitle">
           Apenas Brabos Abaixo ({pessoasFavoritas.length})
          </h2>
          <ul>
            {pessoasFavoritas.map((item,index)=>{
              if(index <= 5){
                return (
                  <li key={item}>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`https://github.com/${item}.png`}/>
                      <span>{item}</span>
                    </a>
                  </li> 
                );
              }
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
  </>
  );
}


export async function getServerSideProps(context){
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const decoded = jwt.decode(token);
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth',{
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json());

  if(!isAuthenticated){
    return {
      redirect:{
        destination: '/login',
        permanent: false,
      }
    }
  }


  return{
    props: {
      githubUser: decoded.githubUser,
    },
  }
}
