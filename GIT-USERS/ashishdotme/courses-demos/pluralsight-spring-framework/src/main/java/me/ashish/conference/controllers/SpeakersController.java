package me.ashish.conference.controllers;

import me.ashish.conference.models.Session;
import me.ashish.conference.models.Speaker;
import me.ashish.conference.repositories.SessionRepository;
import me.ashish.conference.repositories.SpeakerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/speakers")
public class SpeakersController {
    @Autowired
    private SpeakerRepository speakerRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public <S extends Speaker> S saveAndFlush(S s) {
        return speakerRepository.saveAndFlush(s);
    }

    @GetMapping
    @RequestMapping(value = "{id}")
    public Speaker getOne(@PathVariable Long id) {
        return speakerRepository.getOne(id);
    }

    @GetMapping
    public List<Speaker> findAll() {
        return speakerRepository.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        speakerRepository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Speaker update(@PathVariable Long id,@RequestBody Speaker speaker){
        Speaker existingSpeaker = speakerRepository.getOne(id);
        BeanUtils.copyProperties(speaker, existingSpeaker, "speaker_id");
        return speakerRepository.saveAndFlush(existingSpeaker);
    }
}
