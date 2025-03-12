## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Google Cloud

- Setup Artifact Regisrsy repository for app
- Perform first revision on Cloud Run deployment
- SA needs permissions on deployment target in respective Project
  - Cloud Run Developer
  - Kubernetes Engine Developer
  - Service Account User
  - Storage Object Admin

# 1\ Domain and IP Address with Cloud Endpoints
https://cloud.google.com/architecture/exposing-service-mesh-apps-through-gke-ingress/deployment#configure_ip_addressing_and_dns

```
export GCLB_IP=$(gcloud compute addresses describe sportsball \
  --global \
  --format "value(address)")

echo ${GCLB_IP}
```

```
cat <<EOF > ./.env-dns-spec.yaml
swagger: "2.0"
info:
  description: "Sportsball"
  title: "Sportsball Cloud Endpoints DNS"
  version: "1.0.0"
paths: {}
host: "sportsball.endpoints.${PROJECT_ID}.cloud.goog"
x-google-endpoints:
- name: "sportsball.endpoints.${PROJECT_ID}.cloud.goog"
  target: "${GCLB_IP}"
EOF
```

```
gcloud endpoints services deploy ./.env-dns-spec.yaml
```

# 2\ Provision Global External Application Load Balancer
https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless

as part of this you will need to create an SSL certificate resource with
Google-managed SSL certificate: https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless#ssl_certificate_resource

For cross-project configuration, where the backend service is in another
project, setup serverless negs in the service project to connect to from
the host project

# 3\ VPC Access Connectot for future private outbound configuration
https://cloud.google.com/run/docs/configuring/vpc-connectors


# 4\ Configure IAP
https://codelabs.developers.google.com/secure-serverless-application-with-identity-aware-proxy#5

Where does redirect uri come from? Part of it is Client Id.
```
https://iap.googleapis.com/v1/oauth/clientIds/<oauth2-client-id>:handleRedirect
```

Add members to policy.
```
gcloud iap web add-iam-policy-binding \
    --resource-type=backend-services \
    --service=sportsball-run-dev-be \
    --member=user:$USER_EMAIL \
    --role='roles/iap.httpsResourceAccessor'
```
