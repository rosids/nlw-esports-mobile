import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';

import { THEME } from '../../theme';
import { styles } from './styles';

import { REACT_APP_API_URL } from '@env';
import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import { Heading } from '../../components/Heading';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const handleGoBack = () => navigation.goBack();

  const getDiscordUser = async (adsId: string) => {
    const response = await fetch(`${REACT_APP_API_URL}/ads/${adsId}/discord`);
    const data = await response.json();

    setDiscordDuoSelected(data.discord);
  };

  useEffect(() => {
    const fetchDuos = async () => {
      const response = await fetch(`http://192.168.1.11:3333/games/${game.id}/ads`);
      const duos = await response.json();
      setDuos(duos);
    };

    fetchDuos();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {
                getDiscordUser(item.id);
              }}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={true}
          ListEmptyComponent={() => <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
