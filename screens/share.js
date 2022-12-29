import React, { useState, useEffect } from 'react';
import { Share, View, TextInput, Button } from 'react-native';
import CountDown from 'react-native-countdown-component';

const ShareExample = () => {
    const [dateTimeMs, setDateTimeMs] = useState(0);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `https://play.google.com/store/apps/details?id=com.ththanet.techicianOnline&hl=th`,
            });

            if (result.action === Share.sharedAction) {
                
                setDateTimeMs(1)
            } else if (result.action === Share.dismissedAction) {
                setDateTimeMs(1)
            }
        } catch (error) {
            alert(error.message);

        }
    };
    return (
        <View style={{ marginTop: 20, width: "100%" }} >

            {
                dateTimeMs === 0 ?
                    <Button onPress={onShare} title="เเชร์" />
                    :
                    <CountDown
                        until={60 * 60}
                        size={20}
                        onFinish={() => setDateTimeMs(0)}
                        timeToShow={['M', 'S']}
                    timeLabels={{m: 'MM', s: 'SS'}}
                    />
            }

        </View>
    );
};

export default ShareExample;