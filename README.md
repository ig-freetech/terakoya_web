# S3 バケットへアップロード

`aws s3 cp <ファイルパス> s3://<バケット名>/`

- `aws s3 cp ./app/public/index.js s3://terakoya-client-dev/`

- `aws s3 cp ./app/public/index.html s3://terakoya-client-dev`

# 手順

1. `npm run build` で index.js と index.html を更新
2. 更新されたファイルのみ S3 へアップロード
