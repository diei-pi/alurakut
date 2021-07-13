import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
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
      </Box>
    </div>
  )
}



export default function Home() {
  const user ='diei-pi';
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
      </div>

      <div className= "profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className= "smallTitle">
           Pessoas Da Comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
            {pessoasFavoritas.map((item)=>{
              return (
                  <li>
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
