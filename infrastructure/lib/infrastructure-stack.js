"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
const lambda = require("@aws-cdk/aws-lambda");
const apigateway = require("@aws-cdk/aws-apigateway");
class InfrastructureStack extends cdk.Stack {
    constructor(scope, id, props) {
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
exports.InfrastructureStack = InfrastructureStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmFzdHJ1Y3R1cmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYXN0cnVjdHVyZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFzQztBQUN0QyxzQ0FBdUM7QUFDdkMsOENBQStDO0FBQy9DLHNEQUF1RDtBQUV2RCxNQUFhLG1CQUFvQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2hELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDbkQsVUFBVSxFQUFFLGdCQUFnQjtZQUM1QixvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLG9CQUFvQixFQUFFLFlBQVk7WUFDbEMsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO1NBQ3pDLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3ZELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNwQyxPQUFPLEVBQUUsYUFBYTtTQUN2QixDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNyRCxXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFdBQVcsRUFBRSw2QkFBNkI7U0FDM0MsQ0FBQyxDQUFDO1FBRUgsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7WUFDMUUsZ0JBQWdCLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSx5QkFBeUIsRUFBRTtTQUNwRSxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUVoRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN4RSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDdEYsQ0FBQztDQUNGO0FBaENELGtEQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgczMgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtczMnKTtcbmltcG9ydCBsYW1iZGEgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtbGFtYmRhJyk7XG5pbXBvcnQgYXBpZ2F0ZXdheSA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5Jyk7XG5cbmV4cG9ydCBjbGFzcyBJbmZyYXN0cnVjdHVyZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHNpdGVCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdTaXRlQnVja2V0Jywge1xuICAgICAgYnVja2V0TmFtZTogJ2Zvb2Jhci50ZXN0Lm1wJyxcbiAgICAgIHdlYnNpdGVJbmRleERvY3VtZW50OiAnaW5kZXguaHRtbCcsXG4gICAgICB3ZWJzaXRlRXJyb3JEb2N1bWVudDogJ2Vycm9yLmh0bWwnLFxuICAgICAgcHVibGljUmVhZEFjY2VzczogZmFsc2UsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm9vYmFyTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnRm9vYmFyJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5hc3NldChcInJlc291cmNlc1wiKSxcbiAgICAgIGhhbmRsZXI6IFwiZm9vYmFyLm1haW5cIlxuICAgIH0pO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCBcImZvb2Jhci1hcGlcIiwge1xuICAgICAgcmVzdEFwaU5hbWU6IFwiRm9vYmFyIFNlcnZpY2VcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgc2VydmljZSBzZXJ2ZXMgZm9vYmFyLlwiXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRGb29iYXJJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGZvb2JhckxhbWJkYSwge1xuICAgICAgcmVxdWVzdFRlbXBsYXRlczogeyBcImFwcGxpY2F0aW9uL2pzb25cIjogJ3sgXCJzdGF0dXNDb2RlXCI6IFwiMjAwXCIgfScgfVxuICAgIH0pO1xuXG4gICAgYXBpLnJvb3QuYWRkTWV0aG9kKFwiR0VUXCIsIGdldEZvb2JhckludGVncmF0aW9uKTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdCdWNrZXROYW1lJywgeyB2YWx1ZTogc2l0ZUJ1Y2tldC5idWNrZXROYW1lIH0pO1xuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdCdWNrZXRXZWJzaXRlVXJsJywgeyB2YWx1ZTogc2l0ZUJ1Y2tldC5idWNrZXRXZWJzaXRlVXJsIH0pO1xuICB9XG59XG4iXX0=