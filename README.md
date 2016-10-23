# 2048

An html5/javascript/jquery implementation of the game 2048.

DISCLAIMER: This is by no means complete. Its currently so glitchy it shouldn't even be up on github.

## Install

Just edit this apache vhost config file and you're good to go.

Edit `2048.conf.example` and place it in your vhost directory.
Remember to remove the `.example` extension once its all set up.
Then restart the service.

    vim 2048.conf.example
    cp 2048.conf.example /etc/httpd/vhost.d/2048.conf
    systemctl restart httpd

## Run

Open a web browser and navigate to `0.0.0.0:80`
