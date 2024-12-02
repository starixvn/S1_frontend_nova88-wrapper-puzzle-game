import {useNavigation} from '@react-navigation/native';
import {Box, Button, Text} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import Modal from 'react-native-modal';

interface SuccessModalProps {
  isShow: boolean;
  restart: (e: any) => void;
}

const SuccessModal: FC<SuccessModalProps> = ({isShow, restart}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(isShow);

  const MENU = [
    {
      label: 'Play Again',
      action: () => {
        restart(true);
      },
    },
    {
      label: 'Menu',
      action: () => {
        navigation.navigate('Home');
      },
    },
  ];

  useEffect(() => {
    setVisible(isShow);
  }, [isShow]);

  return (
    <Box>
      <Modal isVisible={visible}>
        <Box alignItems={'center'}>
          <Text color={'primary.100'} fontSize={33} fontWeight={'bold'}>
            Congratulations
          </Text>
          <Text color={'primary.100'} fontSize={28}>
            You Win!
          </Text>
          {MENU.map((i, index) => {
            return (
              <Button
                key={i.label}
                mt={index === 0 ? 8 : 5}
                bg={'primary.200'}
                colorScheme="yellow"
                width={'40%'}
                _text={{fontSize: 18, color: 'white'}}
                onPress={() => {
                  i.action();
                  setVisible(false);
                }}>
                {i.label}
              </Button>
            );
          })}
        </Box>
      </Modal>
    </Box>
  );
};

export default SuccessModal;
