import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');
import lambda = require('@aws-cdk/aws-lambda');
import apigateway = require('@aws-cdk/aws-apigateway');

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: 'foobar.test.mp',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const foobarLambda = new lambda.Function(this, 'Foobar', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.asset("resources"),
      handler: "foobar.main"
    });

    const api = new apigateway.RestApi(this, "foobar-api", {
      restApiName: "Foobar Service",
      description: "This service serves foobar."
    });

    const getFoobarIntegration = new apigateway.LambdaIntegration(foobarLambda, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getFoobarIntegration);

    new cdk.CfnOutput(this, 'BucketName', { value: siteBucket.bucketName });
    new cdk.CfnOutput(this, 'BucketWebsiteUrl', { value: siteBucket.bucketWebsiteUrl });
  }
}
