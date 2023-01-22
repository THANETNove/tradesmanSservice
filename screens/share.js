import React, { useState, useEffect } from 'react';
import { Share, View, TextInput, Button } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { useSelector, useDispatch } from "react-redux";
import repairWork from "./service/getService";


const ShareExample = () => {
    const [id_user, setId_user] = useState(
        useSelector((state) => state.login)
    );
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

        if (id_user != null) {
            const user = await repairWork.getUser(id_user.id);
            if (user[0].score != null) {
                let score = Number(user[0].score) + 1;
                const result = await repairWork.updateScoreUser(id_user.id, score);
            } else {
                const result = await repairWork.updateScoreUser(id_user.id, "1");
            }

            /*            console.log("score", score); */
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
                        timeLabels={{ m: 'MM', s: 'SS' }}
                    />
            }
        </View>
    );
};

export default ShareExample;