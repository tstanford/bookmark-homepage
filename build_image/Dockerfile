FROM debian
RUN apt-get update
RUN apt-get -y install ca-certificates curl gpg

# 3. install docker
RUN install -m 0755 -d /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian trixie stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update
RUN apt-get -y install docker-ce docker-ce-cli containerd.io docker-compose-plugin
#RUN /etc/init.d/docker start 
RUN docker run hello-world

# install npm and yarn
RUN apt-get -y install nodejs npm 
RUN npm install yarn -g 