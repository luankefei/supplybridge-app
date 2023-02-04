FROM node:lts-alpine

# Enable SSH
# Install OpenSSH and set the password for root to "Docker!". In this example, "apk add" is the install instruction for an Alpine Linux-based image.
RUN apk add openssh \
     && echo "root:Docker!" | chpasswd 

# Copy the sshd_config file to the /etc/ssh/ directory
COPY sshd_config /etc/ssh/

# Copy and configure the ssh_setup file
RUN mkdir -p /tmp
COPY ssh_setup.sh /tmp
RUN chmod +x /tmp/ssh_setup.sh \
    && (sleep 1;/tmp/ssh_setup.sh 2>&1 > /dev/null)

# APP
COPY . ./app

WORKDIR /app

RUN yarn

RUN yarn build

# Open port 2222 for SSH access
EXPOSE 2222 3000

RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["sh", "docker-entrypoint.sh"]