// ----------------------------------------------------------------------
// ZerosAndOnes Website — CI/CD pipeline
//
// This is a Multibranch Pipeline. Jenkins's "Declarative: Checkout SCM"
// stage (added automatically by Jenkins) already clones the repo for us.
// Do NOT add a manual `cleanWs()` + `git ...` checkout — that would wipe
// the workspace and then try to clone from a different URL.
//
// What this pipeline does:
//   1. Ensures the Docker Compose v2 plugin is installed on the agent.
//   2. Generates a .env file that docker-compose.yml consumes.
//   3. Builds the Vite bundle inside a multi-stage image, then brings the
//      nginx service up.
//   4. Waits for the container healthcheck to report healthy.
//   5. Runs an in-container smoke test against the SPA root + a deep
//      route (which must fall back to index.html via try_files).
//   6. Prints the live URL on success, or dumps logs on failure.
//
// The ZerosAndOnes site is a Vite + React 19 SPA (react-router-dom).
// nginx serves the built /dist on container port 4500 with SPA fallback.
// ----------------------------------------------------------------------
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '5'))
    }

    environment {
        // ---- Deploy target ----
        // Public host that users will hit in the browser.
        // Change this to whichever VM/domain actually serves this site.
        VM_HOST = '140.245.254.149'

        // ---- Host port mapping (interpolated by docker-compose.yml) ----
        // The container always listens on 4500 internally; this is the host
        // port that's published. Pick a port that is free on the VM.
        HOST_PORT = '4500'

        // ---- Misc ----
        TZ = 'UTC'

        // Stable Compose project name so containers always get the same
        // names (matches `name: zerosandones` in docker-compose.yml).
        COMPOSE_PROJECT_NAME = 'zerosandones'

        // Container name we poll for health (matches container_name in compose).
        WEB_CONTAINER = 'zerosandones-web'
    }

    stages {

        stage('Verify Docker') {
            steps {
                sh '''
                set -e

                docker --version

                if ! docker compose version >/dev/null 2>&1; then
                    echo "Installing Docker Compose plugin..."

                    ARCH=$(uname -m)
                    mkdir -p $HOME/.docker/cli-plugins

                    curl -fsSL \
                      https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-${ARCH} \
                      -o $HOME/.docker/cli-plugins/docker-compose

                    chmod +x $HOME/.docker/cli-plugins/docker-compose
                fi

                docker compose version
                '''
            }
        }

        stage('Generate .env') {
            steps {
                sh '''
                cat > .env <<EOF
# --- Host port mapping ---
HOST_PORT=${HOST_PORT}

# --- Misc ---
TZ=${TZ}
EOF

                echo ".env written:"
                sed 's/=.*/=***/' .env
                '''
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                set -e

                docker compose down --remove-orphans || true

                # Use the build cache for speed. Switch to --no-cache only when
                # you really need a clean rebuild (e.g. base-image security patch
                # or a stale npm layer).
                docker compose build

                docker compose up -d

                docker image prune -f
                '''
            }
        }

        stage('Wait for Web') {
            steps {
                sh '''
                echo "Waiting for ${WEB_CONTAINER} to report healthy..."

                for i in $(seq 1 60); do
                    STATUS=$(docker inspect -f '{{.State.Health.Status}}' ${WEB_CONTAINER} 2>/dev/null || echo "starting")

                    if [ "$STATUS" = "healthy" ]; then
                        echo "Web service is healthy."
                        exit 0
                    fi

                    if [ "$STATUS" = "unhealthy" ]; then
                        echo "Web service reported unhealthy."
                        docker compose logs web
                        exit 1
                    fi

                    sleep 5
                done

                echo "Web service failed to become healthy within timeout."
                docker compose logs
                exit 1
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                set -e

                # We run the smoke test INSIDE the container via `docker exec`
                # rather than from the Jenkins agent. Reason: when Jenkins
                # itself runs in a container, its 127.0.0.1 is its own
                # loopback — not the host where zerosandones-web publishes
                # port 4500. Running inside the container side-steps all
                # network topology assumptions and uses nginx's own listener.

                echo "Hitting the landing page from inside ${WEB_CONTAINER}..."

                STATUS=$(docker exec ${WEB_CONTAINER} \
                    wget -q -S -O /dev/null http://127.0.0.1:4500/ 2>&1 \
                    | awk '/HTTP\\// {print $2; exit}')

                if [ "$STATUS" != "200" ] && [ "$STATUS" != "302" ] && [ "$STATUS" != "301" ]; then
                    echo "Unexpected HTTP status from / : ${STATUS:-no-response}"
                    docker compose logs --tail=100 web || true
                    exit 1
                fi
                echo "Root page returned $STATUS — OK."

                # Deep SPA route must fall back to index.html via try_files,
                # so this should also return 200 even though /about is not a
                # file on disk. This validates the react-router fallback.
                STATUS=$(docker exec ${WEB_CONTAINER} \
                    wget -q -S -O /dev/null http://127.0.0.1:4500/about 2>&1 \
                    | awk '/HTTP\\// {print $2; exit}')

                if [ "$STATUS" != "200" ]; then
                    echo "SPA fallback for /about returned ${STATUS:-no-response} — expected 200."
                    docker compose logs --tail=100 web || true
                    exit 1
                fi
                echo "SPA fallback (/about) returned 200 — OK."

                # Sanity-check a hashed Vite asset exists and is served.
                STATUS=$(docker exec ${WEB_CONTAINER} \
                    sh -c 'ASSET=$(ls /usr/share/nginx/html/assets 2>/dev/null | head -n1); \
                           [ -n "$ASSET" ] && wget -q -S -O /dev/null http://127.0.0.1:4500/assets/$ASSET 2>&1 \
                             | awk "/HTTP\\// {print \\$2; exit}"')

                if [ -n "$STATUS" ] && [ "$STATUS" != "200" ]; then
                    echo "Static asset returned ${STATUS} — expected 200."
                    docker compose logs --tail=100 web || true
                    exit 1
                fi
                echo "Static asset check passed."
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                sh 'docker compose ps'
            }
        }
    }

    post {

        success {
            echo "Deployment Successful"
            echo "Frontend : http://${VM_HOST}:${HOST_PORT}"
            echo "About    : http://${VM_HOST}:${HOST_PORT}/about"
            echo "Contact  : http://${VM_HOST}:${HOST_PORT}/contact"
        }

        failure {
            echo "Deployment Failed"
            sh '''
            docker compose logs --tail=200 || true
            docker compose ps              || true
            '''
        }

        always {
            sh 'docker ps -a'
        }
    }
}
