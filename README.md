## Environments

- [Production](https://terakoyaweb.com/)
- [Development](https://dev.terakoyaweb.com/)

## Next.js

- [Next.js Project Structure](https://nextjs.org/docs/getting-started/project-structure)
- [Commands in Next.js](https://qiita.com/st2222/items/827407bc146ef9886f06)

## Deployment on Vercel

- [Getting Started with Vercel](https://typescriptbook.jp/tutorials/vercel-deploy)

- [Vercel automatically deploys the app when a commit is pushed to the target branch (master or develop)](https://zenn.dev/nekoshita/articles/f8a737f38a5fb4). So you don't need to run any commands on Github Actions to deploy the app on Vercel.

##### DNS Settings

1. [Register domain in Route53](https://chigusa-web.com/blog/route53-reg/)
2. [Add domains to Vercel](https://zenn.dev/keitakn/articles/nextjs-vercel-create-staging)
   - (Prod) Domain: terakoyaweb.com / Redirect to: No Redirect / Git Branch: master
   - (Dev) Domain: dev.terakoyaweb.com / Redirect to: No Redirect / Git Branch: develop
3. [Create DNS record in Route53 and wait for the registration for public DNS](https://dev.classmethod.jp/articles/vercel-custom-domain-route53/)
   - (Prod) Record Name(terakoyaweb.com): (empty) / Record Type: A / Value: XX.XX.XX.XX
   - (Dev) Record Name(dev.terakoyaweb.com): dev / Record Type: CNAME / Value: cname.vercel-dns.com.
   - **Run command [docker run --rm -it -v /path/to/.aws:/root/.aws -v $(pwd):/wd -w /wd hashicorp/terraform:latest init[apply -auto-approve]](https://hub.docker.com/r/hashicorp/terraform/) in ./tools directory to create the above DNS records.**
     - [terraform](https://hub.docker.com/r/hashicorp/terraform/) automatically loads ~/.aws/credentials and ~/.aws/config.
     - [terraform commands](https://qiita.com/empty948/items/7db361ad875b778a456a)
     - [terraform apply -auto-approve](https://documentroot.org/articles/auto-approve-for-terraform.html) can be used to skip the confirmation (yes).
4. Push a commit to the target branch after the above DNS registration and settings in Vercel are completed to deploy the app to the domain.
   - Otherwise, the error "Your domain was not yet assigned to the latest commit on your Git Branch. To assign it, please push a new commit to the $BranchName Git Branch. " will occur.

##### Environment Variables on Vercel

- [Define environment variables for each environment (development, staging, production) in Vercel](https://zenn.dev/keitakn/articles/nextjs-vercel-create-staging#production%E3%80%81staging%E3%81%9D%E3%82%8C%E3%81%9E%E3%82%8C%E3%81%AB%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%81%AE%E8%BF%BD%E5%8A%A0)
  - ex: STAGE[Development, Preview]: development / STAGE[Production]: production
  - https://zenn.dev/umyomyomyon/scraps/dbcb906e75c96b#comment-081a8d3530f013
  - https://www.snorerelax.com/posts/tech-vercel-environment/

## TODO

- [lodash](https://qiita.com/sosomuse/items/a08e28def541c28458a0)
  - https://blog.isystk.com/system_develop/frontend/javascript/1555/
- [react-icons](https://react-icons.github.io/react-icons/)
  - https://zenn.dev/taichifukumoto/articles/how-to-use-react-icons
