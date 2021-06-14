/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import {size} from 'lodash';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Heading, Row} from '../../Components';
import shareData from '../../Lib/Share';
import NavigationService from '../../Navigation';
import ROUTES from '../../Navigation/Routes';
import HomeActions, {STATUS} from '../../Redux/Home';
import moment from 'moment';

export default class HomeScreen extends React.Component {
  render() {
    return <MovieList {...this.props} />;
  }
}

const MovieList = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.home.status);
  const movies = useSelector(state => state.home.movies);
  const loading = status === STATUS.FETCHING;

  useEffect(() => {
    dispatch(HomeActions.movieRequest());
  }, [dispatch]);
  const _renderItem = ({item}) => {
    console.log('item', item);
    return <MovieListItem item={item} />;
  };
  const onRefresh = () => {
    dispatch(HomeActions.videoRequest());
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'#0D7BBF'} />
        </View>
      ) : movies && size(movies) ? (
        <FlatList
          data={movies}
          renderItem={_renderItem}
          extraData={movies}
          keyExtractor={(item, i) => i + 'key'}
          onRefresh={onRefresh}
          refreshing={loading}
          contentContainerStyle={{paddingBottom: 20}}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Heading>No Movie List Found</Heading>
        </View>
      )}
    </View>
  );
};

export const Header = ({}) => {
  return (
    <Row
      spread
      style={{
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#FFF5EE',
        elevation: 10,
      }}>
      <Heading style={{fontWeight: 'bold'}}>Movies List</Heading>
    </Row>
  );
};

const MovieListItem = ({item}) => {
  const _onPressItem = () => {
    NavigationService.navigate(ROUTES.MOVIE_DETAIL, {item});
  };
  return (
    <TouchableOpacity
      onPress={_onPressItem}
      onLongPress={() =>
        shareData({
          url: item.video_url,
        })
      }>
      <View
        style={{
          marginTop: 30,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            borderRadius: 10,
            elevation: 5,
            marginTop: -20,
            padding: 10,
          }}>
          <Row spread>
            <View />
            <Text style={{fontSize: 10}}>
              Release Date :{' '}
              {moment(item.releaseDate, 'yyyy-MM-DD').format('DD MMM yyyy')}
            </Text>
          </Row>
          <Heading style={{fontWeight: 'bold'}}>{item?.title}</Heading>
          <Heading color={'black'}>Dir : {item?.director}</Heading>
          <Text style={{fontSize: 12}}>Episode No. : {item.episodeID}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
