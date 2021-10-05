import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function HowTo() {
  return (
    <div className="container">
        <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{textAlign: "left"}}>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
                </Typography> */}
                <Typography variant="h5" component="div" sx={{ fontSize: 30}}>
                使い方
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                編集日時：2021/10/2
                </Typography>
                <Typography variant="body2"　sx={{ fontSize: 18}}>
                <br />
                1.各日付のカードをクリックすると、該当日の帳簿が表示されます。そこで帳簿の編集、追加、削除が行えます。
                <br/><br /><br/>
                2.各帳簿の右下にあるExcel出力を押すと、xlsx形式で帳簿をダウンロードできます。
                <br /><br /><br />
                3.最初の画面の更新ボタンをクリックすると、黒い砂漠の統合取引所から、予約販売/購入で清算したアイテムを自動で取得し、その日の帳簿データを自動で作成します。※
                <br /><br/><br /><br/>
                ※なお、予約以外で取引したアイテムは統合取引所の仕様上、自動では記録されません。
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
        <br />
        <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{textAlign: "left"}}>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
                </Typography> */}
                <Typography variant="h5" component="div" sx={{ fontSize: 30}}>
                ヒント
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                編集日時：2021/10/2
                </Typography>
                <Typography variant="body2"　sx={{ fontSize: 18}}>
                <br />
                Q.今日分の帳簿データがない。
                <br />
                A.更新ボタンをクリックしてください。統合取引所で新しい取引データがなくても作成されます。
                <br /><br />
                Q.更新ボタンを押したら、認証情報を更新してくださいと表示された。
                <br />
                A.サイト右上の認証情報の更新を開き、クッキーを入力して認証情報を更新してください。
                <br />クッキーの取得方法については後日記載予定。
                </Typography>
            </CardContent>
        </Card>
        
    </div>
  );
}
