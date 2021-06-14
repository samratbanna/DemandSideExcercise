/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import {groupBy, map, size} from 'lodash';
import React from 'react';
import {SectionList, Text, View} from 'react-native';
import {Heading, Row} from '../../Components';

export default class MovieDetailScreen extends React.Component {
  render() {
    return <MovieDetail {...this.props} />;
  }
}

const MovieDetail = ({route}) => {
  const movie = route?.params?.item;
  const characters = movie.characterConnection.characters;
  const homwWorldGrouped = groupBy(characters, c => c.homeworld.name);
  const sectionedData = map(homwWorldGrouped, (value, key) => ({
    id: value[0].homeworld.id,
    name: key,
    data: value,
  }));
  const _renderItem = ({item}) => {
    return <CharacterListItem item={item} />;
  };
  const _renderHeader = ({section: {name}}) => {
    return (
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <Heading style={{fontWeight: 'bold'}}>Home World : {name}</Heading>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header title={movie.title} />
      {sectionedData && size(sectionedData) ? (
        <SectionList
          sections={sectionedData}
          keyExtractor={(item, index) => item + index}
          renderItem={_renderItem}
          renderSectionHeader={_renderHeader}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Heading>No Movie List Found</Heading>
        </View>
      )}
    </View>
  );
};

export const Header = ({title}) => {
  return (
    <Row
      spread
      style={{
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#FFF5EE',
        elevation: 10,
      }}>
      <Heading style={{fontWeight: 'bold'}}>{title}</Heading>
    </Row>
  );
};

const CharacterListItem = ({item}) => {
  return (
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
          <Text style={{fontSize: 10}}>Birth Year :{item.birthYear}</Text>
        </Row>
        <Heading style={{fontWeight: 'bold'}}>{item?.name}</Heading>
        <Text style={{fontSize: 12}}>Eye Color : {item?.eyeColor}</Text>
        <Text style={{fontSize: 12}}>Skin Color : {item?.skinColor}</Text>
        <Text style={{fontSize: 12}}>Height : {item?.height}</Text>
        <Text style={{fontSize: 12}}>Mass : {item?.mass}</Text>
      </View>
    </View>
  );
};
