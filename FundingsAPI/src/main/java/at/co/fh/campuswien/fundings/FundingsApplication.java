package at.co.fh.campuswien.fundings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FundingsApplication {

    public static void main(String[] args) {
        SpringApplication.run(FundingsApplication.class, args);
    }

}
