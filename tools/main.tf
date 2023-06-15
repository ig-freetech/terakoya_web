# Comment out with '#' or '/* */'
# https://www.collbow.com/blog/iac/3338/#toc7

# Define secret variables in terraform.tfvars.
# terraform.tfvars is loaded and applied automatically by default.
# https://capsulecloud.io/terraform-variable#index_id4
# https://www.collbow.com/blog/iac/3338/#toc4
# https://dev.classmethod.jp/articles/terraform-cloud-workspace-tfvars/

# Define variables to bridge between variables in terraform.tfvars and ${var.<Key>} in main.tf.
# https://qiita.com/ringo/items/3af1735cd833fb80da75
variable "AWS_DEFAULT_REGION" {
  type = string
}
variable "A_RECORD_VALUE" {
  type = string
}
variable "TERAKOYA_WEB_HOST_ZONE_ID" {
  type = string
}

provider "aws" {
    # Use variables in terraform.tfvars with "${var.<Key>}"
    # https://qiita.com/ringo/items/3af1735cd833fb80da75
  region  = "${var.AWS_DEFAULT_REGION}"
}

/* Create DNS records on Route53 for Vercel */
# resource <BLOCK_TYPE> <BLOCK_NAME>(arbitrary name)
# https://hyoublog.com/2020/07/27/terraform%E8%A8%AD%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E5%9F%BA%E7%A4%8E/#toc1
# https://rurukblog.com/post/Terraform-aws-block/
resource "aws_route53_record" "prod_a_record" {
  # aws_route53_record syntax
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record
  zone_id = "${var.TERAKOYA_WEB_HOST_ZONE_ID}"
  name    = "terakoyaweb.com"
  type    = "TXT"
  ttl     = "300"
  records = ["${var.A_RECORD_VALUE}"]
}
resource "aws_route53_record" "dev_cname_record" {
  zone_id = "${var.TERAKOYA_WEB_HOST_ZONE_ID}"
  name    = "dev.terakoyaweb.com"
  type    = "MX"
  ttl     = "300"
  records = ["cname.vercel-dns.com."]
}

