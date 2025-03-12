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

Right now some Click-Ops is required. In the console:

- Setup Artifact Regisrsy repository for the app (`sportsball`)
- Deployment SA needs permissions on deployment target in respective Project
  - Cloud Run Developer
  - Kubernetes Engine Developer
  - Service Account User
  - Storage Object Admin

# 1\ Domain and IP Address with Cloud Endpoints
https://cloud.google.com/architecture/exposing-service-mesh-apps-through-gke-ingress/deployment#configure_ip_addressing_and_dns

```
gcloud compute addresses create sportsball-gclb-ip \
  --global \
  --project=${GCP_PROJECT_ID}
```

```
export GCLB_IP=$(gcloud compute addresses describe sportsball-gclb-ip \
  --global \
  --format "value(address)" \
  --project=${GCP_PROJECT_ID})

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
host: "sportsball.endpoints.${GCP_PROJECT_ID}.cloud.goog"
x-google-endpoints:
- name: "sportsball.endpoints.${GCP_PROJECT_ID}.cloud.goog"
  target: "${GCLB_IP}"
EOF
```

```
gcloud endpoints services deploy ./.env-dns-spec.yaml \
  --project=${GCP_PROJECT_ID}
```

# 2\ Provision Global External Application Load Balancer
https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless

As part of this you will need to create an SSL certificate resource with
Google-managed SSL certificate: https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless#ssl_certificate_resource

```
gcloud beta compute ssl-certificates create sportsball-cert \
  --project=${GCP_PROJECT_ID} \
  --global \
  --domains=sportsball.endpoints.${GCP_PROJECT_ID}.cloud.goog
```

For cross-project configuration, where the backend service is in another
project, setup serverless negs in the service project to connect to from
the host project.

```
export GCP_PROJECT_ID_TARGET_DEV=<target-project-id>
```

```
gcloud compute network-endpoint-groups create sportsball-run-neg \
  --project=${GCP_PROJECT_ID_TARGET_DEV} \
  --region=us-central1 \
  --network-endpoint-type=serverless  \
  --cloud-run-service=sportsball-run-dev
```

Create and add Serverless Network Endpoint Group to backend service

```
gcloud compute backend-services create sportsball-be \
  --project=${GCP_PROJECT_ID_TARGET_DEV} \
  --load-balancing-scheme=EXTERNAL \
  --global
```

```
gcloud compute backend-services add-backend sportsball-be \
  --project=${GCP_PROJECT_ID_TARGET_DEV} \
  --global \
  --network-endpoint-group=sportsball-run-neg \
  --network-endpoint-group-region=us-central1
```

```
gcloud compute url-maps create sportsball-url-map \
  --project=${GCP_PROJECT_ID_TARGET_DEV} \
  --default-service sportsball-be
```

# 3\ VPC Access Connector for future private outbound configuration
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

# 5\ Setup secret configurations

```
gcloud secrets create firebase-sportsball \
    --replication-policy="automatic" \
    --project="${GCP_PROJECT_ID}"
```

```
gcloud secrets versions add firebase-sportsball \
  --data-file firebase.json \
  --project="${GCP_PROJECT_ID}"
```
