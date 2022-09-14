import { ImageBackground } from 'react-native';

import backgroundImg from '../../assets/background-galaxy.png';

import { styles } from './styles';

interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={backgroundImg}
      // memoriza a imagem padrão acelerando o carregamento da imagem, por conta do source pressupor que sempre haverá um novo valor ele busca e recarrega a imagem. Sem esse default, pode haver um delay no carregamento da imagem
      defaultSource={backgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
