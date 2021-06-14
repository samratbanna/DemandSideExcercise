import Share from 'react-native-share';

function shareData(shareOptions) {
  console.log('share options', shareOptions);

  Share.open(shareOptions)
    .then(res => {
      console.log('LOG_shhared', res);
    })
    .catch(err => {
      console.log('LOG_errorshare ', err);
    });
}

export default shareData;
